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
import { Timeline } from "./Timeline";
import { Monogram } from "./Ornaments";
import { GownStory } from "./GownStory";
import { InvitationLanguageProvider, LanguageSwitch, useInvitation } from "./InvitationLanguage";

export function InvitationExperience() {
  return <InvitationLanguageProvider><Experience/></InvitationLanguageProvider>;
}
function Experience() {
  const { t, language } = useInvitation();
  const [entered, setEntered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [mediaPaused, setMediaPaused] = useState(false);
  const music = useRef<MusicHandle>(null);
  const invitation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    if (!unlocked) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = oldOverflow; };
  }, [unlocked]);
  function closeInvitation() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setUnlocked(false);
    setEntered(false);
  }
  return <MotionConfig reducedMotion="user">
    <LanguageSwitch/>
    <MusicPlayer ref={music} cover={!entered} onToggle={setMediaPaused}/>
    <AnimatePresence onExitComplete={()=>{setUnlocked(true); invitation.current?.focus({preventScroll:true});}}>
      {!entered && <IntroEnvelope mediaPaused={mediaPaused} key="intro" onOpen={()=>music.current?.play()} onComplete={()=>setEntered(true)}/>}
    </AnimatePresence>
    <div ref={invitation} tabIndex={-1} className="site-content" lang={language} inert={!entered} aria-hidden={!entered}>
      <main><GownStory entered={entered} footer={<footer className="site-footer"><Monogram/><button type="button" className="close-invitation meta" onClick={closeInvitation}><TypedText text={t.close}/><span aria-hidden="true">↑</span></button></footer>}>
        <InvitationLetter/><CoupleStory/><DetailsSection/><Timeline/><Countdown/>
      </GownStory></main>
    </div>
  </MotionConfig>;
}
