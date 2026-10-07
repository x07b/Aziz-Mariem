"use client";
import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { eventConfig } from "@/config/event";

/** The scene and existing sections share a single continuous textile canvas. */
export function GownStory({ children, entered, footer }: { children: ReactNode; entered: boolean; footer?: ReactNode }) {
  const reduced = useReducedMotion();
  return <div className="gown-story" style={{ "--fabric-image": `url("${eventConfig.storytelling.fabric}")` } as CSSProperties}>
    <div className="fabric-canvas" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span className="fabric-tile" key={index}/>)}</div>
    <section className="gown-scene" aria-label="بداية جميلة معًا">
      <motion.div className="doorway-image" initial={false} animate={{ opacity: entered ? 1 : .7 }} transition={{ duration: reduced ? .2 : 1.4 }}>
        <Image src={eventConfig.storytelling.scene} alt={eventConfig.storytelling.sceneAlt} fill sizes="(max-width: 1000px) 100vw, 1000px" className="doorway-photo"/>
      </motion.div>
      <motion.div className="scene-blessing" initial={false} animate={{ opacity: entered ? 1 : 0 }} transition={{ duration: reduced ? .2 : 1, delay: reduced ? 0 : .3 }}>
        <p className="bismillah" lang="ar" dir="rtl">{eventConfig.storytelling.bismillah}</p>
        <p className="quran-verse" lang="ar" dir="rtl">{eventConfig.storytelling.verse}</p>
      </motion.div>
    </section>
    <div className="gown-content">{children}{footer}</div>
  </div>;
}
