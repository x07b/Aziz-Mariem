"use client";
import { invitationNames, eventConfig } from "@/config/event";
import { Branch, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
import { TypedText } from "./TypedText";
import { useInvitation } from "./InvitationLanguage";

export function InvitationLetter() {
  const { t, dateText } = useInvitation();
  return <section className="invitation-letter paper" id="invitation" aria-labelledby="announcement-heading">
    <Branch className="letter-botanical botanical-left"/><Branch className="letter-botanical botanical-right"/>
    <div className="letter-content bilingual-letter reading-surface">
      <Reveal><Flourish/><h1 className="announcement" id="announcement-heading"><TypedText text={t.announcement}/></h1></Reveal>
      <Reveal><p className="invitation-introduction"><TypedText text={t.introduction}/></p><time className="invitation-date" dateTime={eventConfig.event.date || undefined}><TypedText text={dateText}/></time></Reveal>
      <Reveal className="letter-signoff"><p className="script letter-names"><TypedText text={invitationNames}/></p></Reveal>
    </div>
  </section>;
}
