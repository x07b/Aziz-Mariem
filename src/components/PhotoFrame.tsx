"use client";
import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/config/event";
import { Branch } from "./Ornaments";

export function PhotoImage({ photo, priority = false, sizes = "(max-width: 768px) 100vw, 60vw", className = "" }: { photo: Photo; priority?: boolean; sizes?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed || !photo.src ? <div className={`photo-placeholder ${className}`} role="img" aria-label={`${photo.alt} — صورة قريبًا`}><Branch/><span>لحظة للذكرى</span></div> : <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`editorial-photo ${className}`} style={{ objectPosition: photo.position || "center" }} onError={() => setFailed(true)}/>;
}
export function PhotoFrame({ photo, shape = "oval", className = "", caption }: { photo: Photo; shape?: "oval" | "heart" | "polaroid"; className?: string; caption?: string }) {
  return <figure className={`photo-frame photo-${shape} ${className}`}>
    <div className="photo-frame-image"><PhotoImage photo={photo} sizes="(max-width: 768px) 80vw, 440px"/></div>
    {shape === "heart" && <svg className="heart-lace" viewBox="0 0 320 300" fill="none" aria-hidden="true"><path d="M160 266C134 242 26 177 26 99C26 33 114 13 160 79C206 13 294 33 294 99C294 177 186 242 160 266Z" stroke="currentColor" strokeWidth="15" strokeDasharray="1 7" strokeLinecap="round"/><path d="M160 266C134 242 26 177 26 99C26 33 114 13 160 79C206 13 294 33 294 99C294 177 186 242 160 266Z" stroke="currentColor" strokeWidth="3"/><path d="M160 253C125 225 39 169 39 101C39 45 113 28 160 94C207 28 281 45 281 101C281 169 195 225 160 253Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/></svg>}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
