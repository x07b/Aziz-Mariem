"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Reserve the complete text layout while letters appear, without shifting content. */
export function TypedText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  let character = 0;
  return <span className="typed-text" aria-label={text}><motion.span key={text} aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35, margin: "0px 0px -35px 0px" }}>
    {text.split(" ").map((word, index) => <span className="typed-word" key={index}>{Array.from(word).map((letter, letterIndex) => {
      const delay = character++ * Math.min(.035, 2 / text.length);
      return <motion.span key={letterIndex} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: reduced ? 0 : .18, delay: reduced ? 0 : delay } } }}>{letter}</motion.span>;
    })}{" "}</span>)}
  </motion.span></span>;
}
