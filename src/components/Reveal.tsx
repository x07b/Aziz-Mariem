"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`content-reveal ${className}`} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12, margin: "0px 0px -15px 0px" }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
