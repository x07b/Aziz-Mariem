import { eventConfig } from "@/config/event";
export type RSVPResponse = { name: string; attending: "yes" | "no"; guests: number; note: string };
export const RSVP_STORAGE_KEY = "aziz-mariem:rsvps:v1";
/** Local demo adapter. Replace this function with your API call to collect guest replies centrally. */
export async function submitRSVP(response: RSVPResponse): Promise<{ id: string; storage: "local" }> {
  if (!response.name.trim() || response.name.length > 120) throw new Error("Please enter your name (up to 120 characters).");
  if (!["yes", "no"].includes(response.attending)) throw new Error("Please tell us if you can attend.");
  if (!Number.isInteger(response.guests) || (response.attending === "yes" && (response.guests < 1 || response.guests > eventConfig.rsvp.maxGuests))) throw new Error("Please choose a valid number of guests.");
  if (response.note.length > 1500) throw new Error("Please keep your note under 1,500 characters.");
  const id = crypto.randomUUID();
  try {
    const previous: unknown = JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY) || "[]");
    if (!Array.isArray(previous)) throw new Error("Invalid local data");
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify([...previous, { ...response, name: response.name.trim(), guests: response.attending === "no" ? 0 : response.guests, id, createdAt: new Date().toISOString() }]));
  } catch {
    throw new Error("We couldn’t save your reply on this device. Please enable browser storage and try again.");
  }
  return { id, storage: "local" };
}
