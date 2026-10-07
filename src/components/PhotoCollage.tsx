"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { eventConfig } from "@/config/event";
import { Branch, Monogram } from "./Ornaments";
import { PhotoFrame, PhotoImage } from "./PhotoFrame";
export function PhotoCollage() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const fast = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  return <section className="collage-section" ref={section} aria-label="قصاصات من ذكريات الخطوبة"><div className="collage"><motion.div className="collage-scenic" style={{ y: reduced ? 0 : slow }}><PhotoImage photo={eventConfig.photos.scenic}/></motion.div><motion.div className="collage-envelope" style={{ y: reduced ? 0 : fast }}><Monogram/></motion.div><motion.div className="collage-polaroid" style={{ y: reduced ? 0 : slow }}><PhotoFrame shape="polaroid" photo={eventConfig.photos.second} caption="لحظة معًا"/></motion.div><div className="collage-label"><span className="meta arabic-ui" lang="ar" dir="rtl">الاحتفال</span><span className="arabic-ui" lang="ar" dir="rtl">معًا</span></div><Branch className="collage-flower"/></div></section>;
}
