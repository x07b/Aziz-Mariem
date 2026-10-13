"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`content-reveal ${className}`} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(3px)" }} whileInView={{ opacity: 1, y: 0, filter: reduced ? "none" : "blur(0px)" }} viewport={{ once: true, amount: .12, margin: "0px 0px -28px 0px" }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
