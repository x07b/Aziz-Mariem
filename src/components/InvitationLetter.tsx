"use client";
import { Branch, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
import { useInvitation } from "./InvitationLanguage";

export function InvitationLetter() {
  const { t, language } = useInvitation();
  return <section className="invitation-letter paper" id="invitation" aria-label={t.coverSubtitle}>
    <Branch className="letter-botanical botanical-left"/><Branch className="letter-botanical botanical-right"/>
    <div className="letter-content bilingual-letter reading-surface">
      <Reveal><Flourish/><div className="love-letter">{t.loveLetter.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Reveal>
      <Reveal className="letter-signoff"><p className="script letter-names">{language === "ar" ? "عزيز ومريم" : "Aziz & Mariem"}</p></Reveal>
    </div>
  </section>;
}
