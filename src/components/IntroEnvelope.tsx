"use client";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig, invitationCopy } from "@/config/event";
import { Branch } from "./Ornaments";

export function IntroEnvelope({ onOpen, onComplete, mediaPaused = false }: { onOpen: () => void; onComplete: () => void; mediaPaused?: boolean }) {
  const [opening, setOpening] = useState(false);
  const t = invitationCopy.fr;
  const [failed, setFailed] = useState(false);
  const opened = useRef(false);
  const video = useAutoplayVideo(!mediaPaused && !failed);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function open() {
    if (opened.current) return;
    opened.current = true;
    onOpen();
    setOpening(true);
    timer.current = setTimeout(onComplete, reduced ? 80 : 350);
  }
  return <motion.div className="intro cinematic-cover" lang="fr" dir="ltr" role="dialog" aria-label={t.coverSubtitle} exit={{ opacity: 0 }} transition={{ duration: reduced ? .15 : .55 }}>
    <Branch className="cover-botanical cover-botanical-left"/><Branch className="cover-botanical cover-botanical-right"/>
    <motion.div className="cover-stage" animate={{ opacity: opening ? .4 : 1, scale: opening && !reduced ? 1.025 : 1 }} transition={{ duration: .8 }}>
      <Image src={eventConfig.cover.poster} alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" className="cover-poster"/>
      {eventConfig.introVideoSrc && !failed && <video ref={video} className="cover-film" src={eventConfig.introVideoSrc} poster={eventConfig.cover.poster} autoPlay={!mediaPaused} muted loop playsInline preload="auto" aria-hidden="true" onError={()=>setFailed(true)}/>}
      <motion.div className="cover-wordmark" initial={{ opacity: 0 }} animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: reduced ? .15 : 1.2 }}>
        <span className="cover-eyebrow">{t.coverSubtitle}</span>
        <h1 className="script" lang="fr" dir="ltr"><span>{eventConfig.couple.firstPerson}</span><i>&amp;</i><span>{eventConfig.couple.secondPerson}</span></h1>
        <p lang="fr">{t.coverNote}</p>
      </motion.div>
      <motion.button autoFocus type="button" className="intro-open-button cover-enter" onClick={open} disabled={opening} aria-disabled={opening} animate={{ opacity: opening ? 0 : 1 }} lang="fr"><span>{t.enter}</span><svg viewBox="0 0 32 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="M1 8h28m-7-6 7 6-7 6"/></svg></motion.button>
    </motion.div>
  </motion.div>;
}
