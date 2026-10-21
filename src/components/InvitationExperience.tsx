"use client";
import { TypedText } from "./TypedText";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { IntroEnvelope } from "./IntroEnvelope";
import { MusicPlayer, type MusicHandle } from "./MusicPlayer";
import { InvitationLetter } from "./InvitationLetter";
import { Countdown } from "./Countdown";
import { CoupleStory } from "./CoupleStory";
import { DetailsSection } from "./DetailsSection";
import { Monogram } from "./Ornaments";
import { GownStory } from "./GownStory";
import { ProposalFilm } from "./ProposalFilm";
import { OpeningPetals } from "./OpeningPetals";
import { InvitationLanguageProvider, LanguageSwitch, useInvitation } from "./InvitationLanguage";

export function InvitationExperience() {
  return <InvitationLanguageProvider><Experience/></InvitationLanguageProvider>;
}
function Experience() {
  const { t, language } = useInvitation();
  const [entered, setEntered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [petalsStarted, setPetalsStarted] = useState(false);
  const music = useRef<MusicHandle>(null);
  const invitation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    const oldRootOverflow = document.documentElement.style.overflow;
    if (!unlocked) { document.body.style.overflow = "hidden"; document.documentElement.style.overflow = "hidden"; }
    return () => { document.body.style.overflow = oldOverflow; document.documentElement.style.overflow = oldRootOverflow; };
  }, [unlocked]);
  function closeInvitation() {
    invitation.current?.querySelectorAll<HTMLMediaElement>("video,audio").forEach(media => media.pause());
    music.current?.playCover();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setUnlocked(false);
    setEntered(false);
  }
  return <MotionConfig reducedMotion="user">
    {entered && <OpeningPetals started={petalsStarted}/>}
    {entered && <LanguageSwitch/>}
    <MusicPlayer ref={music} cover={!entered}/>
    <AnimatePresence onExitComplete={()=>{setUnlocked(true); invitation.current?.focus({preventScroll:true});}}>
      {!entered && <IntroEnvelope key="intro" onOpen={()=>{music.current?.play(); setPetalsStarted(true);}} onComplete={()=>setEntered(true)}/>}
    </AnimatePresence>
    <div ref={invitation} tabIndex={-1} className="site-content" hidden={!entered} lang={language} inert={!entered} aria-hidden={!entered}>
      <main><GownStory entered={entered} footer={<footer className="site-footer"><Monogram/><button type="button" className="close-invitation meta" onClick={closeInvitation}><TypedText text={t.close}/><span aria-hidden="true">↑</span></button></footer>}>
        <InvitationLetter/><CoupleStory/><DetailsSection/><Countdown/><ProposalFilm entered={entered}/>
      </GownStory></main>
    </div>
  </MotionConfig>;
}
