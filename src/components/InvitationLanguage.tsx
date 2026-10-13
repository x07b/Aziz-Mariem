"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { eventConfig, invitationCopy, type InvitationLanguage } from "@/config/event";
import { validDate } from "@/lib/date";

const Context = createContext<{ language: InvitationLanguage; setLanguage: (language: InvitationLanguage) => void } | null>(null);
export function InvitationLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<InvitationLanguage>("fr");
  useEffect(() => {
    const timer = setTimeout(() => {
      try { const saved = localStorage.getItem("invitation-language"); if (saved === "en" || saved === "fr") setLanguage(saved); } catch { /* Language switching works without storage. */ }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = "ltr"; }, [language]);
  function choose(next: InvitationLanguage) {
    setLanguage(next);
    try { localStorage.setItem("invitation-language", next); } catch { /* Optional preference persistence. */ }
  }
  return <Context.Provider value={{ language, setLanguage: choose }}>{children}</Context.Provider>;
}
export function useInvitation() {
  const context = useContext(Context);
  if (!context) throw new Error("InvitationLanguageProvider is required");
  const t = invitationCopy[context.language];
  const date = validDate(eventConfig.event.date);
  const dateText = date ? new Intl.DateTimeFormat(t.locale, { day: "numeric", month: "long", year: "numeric", timeZone: eventConfig.event.timeZone }).format(date) : t.pending;
  const timeText = date ? new Intl.DateTimeFormat(t.locale, { hour: "numeric", minute: "2-digit", hour12: context.language === "en", timeZone: eventConfig.event.timeZone }).format(date) : t.pending;
  return { ...context, t, dateText, timeText };
}
export function LanguageSwitch() {
  const { language, setLanguage, t } = useInvitation();
  return <button className="language-switch" type="button" onClick={()=>setLanguage(language === "fr" ? "en" : "fr")} aria-label={t.switchLanguage} title={t.switchLanguage}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></svg><span>{language.toUpperCase()}</span>
  </button>;
}
