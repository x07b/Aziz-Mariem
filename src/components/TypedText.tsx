"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "framer-motion";

/** Reveal whole phrases so Arabic joining and natural word wrapping stay intact. */
export function TypedText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return <motion.span key={text} className="typed-text" initial={{ opacity: reduced ? 1 : .5 }}
    animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .25 }}>{text}</motion.span>;
}
