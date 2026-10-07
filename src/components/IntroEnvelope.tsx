"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { eventConfig } from "@/config/event";
import { Branch } from "./Ornaments";

export function IntroEnvelope({ onOpen, onComplete, mediaPaused = false }: { onOpen: () => void; onComplete: () => void; mediaPaused?: boolean }) {
  const [opening, setOpening] = useState(false);
  const [failed, setFailed] = useState(false);
  const opened = useRef(false);
  const video = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (reduced || mediaPaused) video.current?.pause();
    else void video.current?.play().catch(() => { /* Keep the poster if autoplay is blocked. */ });
  }, [reduced, mediaPaused]);
  function open() {
    if (opened.current) return;
    opened.current = true;
    onOpen();
    setOpening(true);
    timer.current = setTimeout(onComplete, reduced ? 100 : 650);
  }
  return <motion.div className="intro cinematic-cover" role="dialog" aria-modal="true" aria-label="Invitation aux fiançailles d’Aziz et Mariem" exit={{ opacity: 0 }} transition={{ duration: reduced ? .15 : .8 }}>
    <Branch className="cover-botanical cover-botanical-left"/><Branch className="cover-botanical cover-botanical-right"/>
    <motion.div className="cover-stage" animate={{ opacity: opening ? .4 : 1, scale: opening && !reduced ? 1.025 : 1 }} transition={{ duration: .8 }}>
      <Image src={eventConfig.cover.poster} alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" className="cover-poster"/>
      {eventConfig.introVideoSrc && !failed && <video ref={video} className="cover-film" src={eventConfig.introVideoSrc} poster={eventConfig.cover.poster} autoPlay={!reduced && !mediaPaused} muted loop playsInline preload="metadata" aria-hidden="true" onError={()=>setFailed(true)}/>}
      <motion.div className="cover-wordmark" initial={{ opacity: 0 }} animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: reduced ? .15 : 1.2 }}>
        <h1 className="script" lang="fr"><span>{eventConfig.couple.firstPerson}</span><i>&</i><span>{eventConfig.couple.secondPerson}</span></h1>
        <p lang="fr">{eventConfig.cover.subtitle}</p>
      </motion.div>
      <motion.button autoFocus type="button" className="intro-open-button cover-enter" onClick={open} disabled={opening} aria-disabled={opening} animate={{ opacity: opening ? 0 : 1 }} lang="fr"><span>{eventConfig.cover.button}</span><svg viewBox="0 0 32 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="M1 8h28m-7-6 7 6-7 6"/></svg></motion.button>
    </motion.div>
  </motion.div>;
}
