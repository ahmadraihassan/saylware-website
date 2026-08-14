import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultSettings, emptyState } from "./defaults";
import type { DeskState } from "./types";

const FILE = path.join(process.cwd(), "data", "desk.json");
const TMP = path.join("/tmp", "saylware-desk.json");

let chain: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>) {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readJsonFile(file: string): Promise<DeskState | null> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as DeskState;
  } catch {
    return null;
  }
}

async function writeJsonFile(file: string, state: DeskState) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(state, null, 2), "utf8");
}

async function fromNeon(): Promise<DeskState | null> {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(url);
  await sql`CREATE TABLE IF NOT EXISTS desk_state (
    id TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  const rows = (await sql`SELECT payload FROM desk_state WHERE id = 'main' LIMIT 1`) as { payload: DeskState }[];
  return rows[0]?.payload ?? null;
}

async function toNeon(state: DeskState) {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(url);
  await sql`CREATE TABLE IF NOT EXISTS desk_state (
    id TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  await sql`INSERT INTO desk_state (id, payload, updated_at)
    VALUES ('main', ${JSON.stringify(state)}::jsonb, NOW())
    ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`;
  return true;
}

export async function loadState(): Promise<DeskState> {
  const neon = await fromNeon();
  if (neon?.version === 1) return hydrate(neon);
  const file = (await readJsonFile(FILE)) || (await readJsonFile(TMP));
  if (file?.version === 1) return hydrate(file);
  return emptyState();
}

function hydrate(state: DeskState): DeskState {
  state.settings = { ...defaultSettings(), ...state.settings };
  return state;
}

export async function saveState(state: DeskState) {
  const neonOk = await toNeon(state).catch(() => false);
  try {
    await writeJsonFile(FILE, state);
  } catch {
    await writeJsonFile(TMP, state);
  }
  return neonOk;
}

export async function mutateState<T>(fn: (state: DeskState) => T | Promise<T>) {
  return enqueue(async () => {
    const state = await loadState();
    const result = await fn(state);
    await saveState(state);
    return result;
  });
}

export function persistenceHint() {
  if (process.env.DATABASE_URL) return "neon";
  return "file";
}
