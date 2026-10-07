import type { ReactNode } from "react";
import { Branch, Flourish } from "./Ornaments";
export function DecorativeFrame({ children, className = "", variant = "oval" }: { children: ReactNode; className?: string; variant?: "oval" | "card" }) {
  return <div className={`decorative-frame frame-${variant} ${className}`}><div className="frame-inner">{children}</div><Flourish className="frame-crown"/><Flourish className="frame-base"/>{variant === "oval" && <><Branch className="frame-branch left"/><Branch className="frame-branch right"/></>}</div>;
}
