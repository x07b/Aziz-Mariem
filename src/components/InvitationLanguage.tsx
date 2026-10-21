"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { eventConfig, invitationCopy, type InvitationLanguage } from "@/config/event";
import { validDate } from "@/lib/date";

const Context = createContext<{ language: InvitationLanguage; setLanguage: (language: InvitationLanguage) => void } | null>(null);
export function InvitationLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<InvitationLanguage>("ar");
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === "ar" ? "rtl" : "ltr"; }, [language]);
  return <Context.Provider value={{ language, setLanguage }}>{children}</Context.Provider>;
}
export function useInvitation() {
  const context = useContext(Context);
  if (!context) throw new Error("InvitationLanguageProvider is required");
  const t = invitationCopy[context.language];
  const date = validDate(eventConfig.event.date);
  const dateText = date ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: eventConfig.event.timeZone }).format(date) : t.pending;
  const timeText = date ? new Intl.DateTimeFormat("fr-FR", { hour: "numeric", minute: "2-digit", hour12: false, timeZone: eventConfig.event.timeZone }).format(date) : t.pending;
  return { ...context, t, dateText, timeText };
}
export function LanguageSwitch() {
  const { language, setLanguage, t } = useInvitation();
  const next = { fr: "ar", ar: "fr", en: "fr" } as const;
  return <button type="button" className="language-switch" onClick={() => setLanguage(next[language])}
    aria-label={t.switchLanguage} title={t.languageStatus}>
    <svg key={language} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.6" ry="8.5"/><path d="M3.5 12h17M5.4 7.5h13.2M5.4 16.5h13.2"/>
    </svg>
    <span className="control-tooltip" role="status">{t.languageStatus}</span>
  </button>;
}
