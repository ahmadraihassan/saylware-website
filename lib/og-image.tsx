import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const ogSize = { width: 1200, height: 630 };

async function logoSrc() {
  const file = await readFile(join(process.cwd(), "public/saylware-mark.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export async function brandOgImage({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  const logo = await logoSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0f12",
          padding: 64,
          color: "#f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img src={logo} width={56} height={56} style={{ borderRadius: 14 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Saylware</div>
            <div style={{ fontSize: 16, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 2 }}>
              {kicker}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div
            style={{
              fontSize: title.length > 48 ? 48 : 58,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.2,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: "#a1a6b3", lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", color: "#6b7280", fontSize: 20 }}>saylware.com</div>
      </div>
    ),
    { ...ogSize }
  );
}
