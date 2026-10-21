"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { eventConfig } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";

/** The scene and existing sections share a single continuous textile canvas. */
export function GownStory({ children, entered, footer }: { children: ReactNode; entered: boolean; footer?: ReactNode }) {
  const reduced = useReducedMotion();
  const { t } = useInvitation();
  const sceneVideo = useAutoplayVideo(entered, 0.65);
  const canvas = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: canvas, offset: ["start start", "end end"] });
  const fabricY = useTransform(scrollYProgress, [0,1], [-24,24]);
  return <div ref={canvas} className="gown-story" style={{ "--fabric-image": `url("${eventConfig.storytelling.fabric}")` } as CSSProperties}>
    <motion.div className="fabric-canvas" style={{ y: reduced ? 0 : fabricY }} aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span className="fabric-tile" key={index}/>)}</motion.div>
    <section className="gown-scene" aria-label={t.scene}>
      <motion.div className="doorway-image" initial={false} animate={{ opacity: entered ? 1 : .7 }} transition={{ duration: reduced ? .2 : 1.4 }}>
        <video ref={sceneVideo} src="/videos/couple-walking-doors.mp4" poster={eventConfig.storytelling.scene} muted loop playsInline preload="metadata" aria-label={t.sceneAlt} className="doorway-photo"/>
      </motion.div>
      <motion.div className="scene-blessing" initial={false} animate={{ opacity: entered ? 1 : 0 }} transition={{ duration: reduced ? .2 : 1, delay: reduced ? 0 : .3 }}>
        <p className="quran-verse" lang="ar" dir="rtl">{eventConfig.storytelling.verse}</p>
      </motion.div>
    </section>
    <div className="gown-content">{children}{footer}</div>
  </div>;
}
