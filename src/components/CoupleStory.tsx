"use client";
import { eventConfig } from "@/config/event";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";
import { Flourish } from "./Ornaments";
import { useInvitation } from "./InvitationLanguage";
export function CoupleStory() {
  const { t, language } = useInvitation();
  return <section className="story section-pad" aria-labelledby="story-heading">
    <Reveal className="story-divider"><Flourish/></Reveal>
    <Reveal><div className="heart-memories" role="group" aria-label={t.childhood}>
      <svg className="hearts-ribbon" viewBox="0 0 600 170" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M76 143C57 27 201 6 294 62C224-19 350-13 303 63C417 11 546 39 523 154M294 62C235 18 204 41 221 60C236 77 275 67 294 62C344 30 386 37 378 58C372 77 324 67 303 63M294 64q-6 41-34 64M303 64q4 36 33 59"/></svg>
      <PhotoFrame photo={{...eventConfig.photos.aziz,alt:t.azizPhoto}} shape="heart" className="memory-heart aziz-heart" caption={language === "ar" ? "عزيز" : eventConfig.couple.firstPerson}/>
      <PhotoFrame photo={{...eventConfig.photos.mariem,alt:t.mariemPhoto}} shape="heart" className="memory-heart mariem-heart" caption={language === "ar" ? "مريم" : eventConfig.couple.secondPerson}/>
    </div></Reveal>
    <Reveal className="story-message reading-surface"><p className="meta">{t.childhoodLabel}</p><h2 className="journey-title" id="story-heading">{t.journey}</h2><p className="story-invitation">{t.invitation}</p></Reveal>
  </section>;
}
