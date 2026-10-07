import { eventConfig } from "@/config/event";
export function validDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
export function formatDate(value: string | null, fallback = "Date to be announced") {
  const date = validDate(value);
  return date ? new Intl.DateTimeFormat(eventConfig.event.locale, { day: "numeric", month: "long", year: "numeric", timeZone: eventConfig.event.timeZone }).format(date) : fallback;
}
export function formatTime(value: string | null) {
  const date = validDate(value);
  return date ? new Intl.DateTimeFormat(eventConfig.event.locale, { hour: "numeric", minute: "2-digit", hour12: true, timeZone: eventConfig.event.timeZone }).format(date) : "Time to be announced";
}
export function getCountdown(value: string | null, now = Date.now()) {
  const date = validDate(value);
  if (!date) return null;
  const total = Math.max(0, Math.floor((date.getTime() - now) / 1000));
  return { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60, complete: total === 0 };
}
