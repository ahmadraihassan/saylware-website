import { contact, site } from "@/lib/content";
import type { DeskSettings, DeskState } from "./types";

export function defaultSettings(): DeskSettings {
  return {
    senderName: "Awais",
    senderTitle: "Saylware",
    senderEmail: contact.email,
    companyName: site.name,
    physicalAddress: "United States",
    meetUrl: "",
    dailyCap: 50,
    warmupDays: 8,
    startedSendingOn: null,
    sendDays: [1, 2, 3, 4],
    sendStartHour: 8,
    sendEndHour: 11,
    timezone: "America/Denver",
    trackOpens: false,
    trackClicks: true,
    pauseSending: false,
    followupDays: [3, 7],
    signature: "Awais\nSaylware",
    google: null,
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPass: "",
  };
}

export function emptyState(): DeskState {
  return {
    version: 1,
    settings: defaultSettings(),
    leads: [],
    messages: [],
    meetings: [],
    reminders: [],
    suppressions: [],
    events: [],
    sendLog: [],
  };
}
