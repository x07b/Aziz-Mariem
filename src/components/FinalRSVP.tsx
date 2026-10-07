"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { eventConfig } from "@/config/event";
import { formatDate } from "@/lib/date";
import { submitRSVP } from "@/lib/rsvp";
import { PhotoFrame } from "./PhotoFrame";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
export function FinalRSVP() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");
  const [error, setError] = useState("");
  const reduced = useReducedMotion();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "saving") return;
    const data = new FormData(e.currentTarget);
    setError(""); setStatus("saving");
    try {
      await submitRSVP({ name: String(data.get("name") || ""), attending, guests: attending === "yes" ? Number(data.get("guests")) : 0, note: String(data.get("note") || "") });
      setStatus("success");
    } catch (error) { setError(error instanceof Error ? error.message : "Your reply could not be saved. Please try again."); setStatus("idle"); }
  }
  return <section className="final-rsvp section-pad" id="rsvp" aria-labelledby="rsvp-heading"><Reveal><p className="meta section-index">03 — SAVE YOUR SEAT</p><h2 className="script section-title" id="rsvp-heading">Kindly RSVP</h2><PhotoFrame photo={eventConfig.photos.couple} className="rsvp-portrait"/><p className="rsvp-message">{eventConfig.rsvp.message}</p><p className="meta reply-by">{eventConfig.rsvp.deadline ? "PLEASE REPLY BY" : "WE’D LOVE TO HEAR FROM YOU"}</p>{eventConfig.rsvp.deadline && <p className="reply-date">{formatDate(eventConfig.rsvp.deadline)}</p>}</Reveal><div className="rsvp-form-area"><AnimatePresence mode="wait">{status === "success" ? <motion.div key="success" className="rsvp-success" role="status" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><Flourish/><h3 className="script">Thank you.</h3><p>{attending === "yes" ? eventConfig.rsvp.successAccept : eventConfig.rsvp.successDecline}</p><p className="local-notice">Your reply is saved on this device only. It has not been sent to {eventConfig.couple.firstPerson} & {eventConfig.couple.secondPerson}.</p><button type="button" className="text-link meta" onClick={()=>setStatus("idle")}>WRITE ANOTHER REPLY</button></motion.div> : <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="rsvp-form"><div className="field"><label htmlFor="guest-name">Your name <span aria-hidden="true">*</span></label><input id="guest-name" name="name" autoComplete="name" placeholder="First and last name" required maxLength={120}/></div><fieldset><legend>Will you be attending?</legend><div className="attendance-options">{([{value:"yes",label:"Joyfully accept"},{value:"no",label:"Regretfully decline"}] as const).map(option=><label className={`attendance-choice ${attending === option.value ? "selected" : ""}`} key={option.value}><input type="radio" name="attending" value={option.value} checked={attending === option.value} onChange={()=>setAttending(option.value)}/><span className="choice-dot"/><span>{option.label}</span></label>)}</div></fieldset>{attending === "yes" && <div className="field"><label htmlFor="guest-count">Number of guests <span className="muted">(including you)</span></label><select id="guest-count" name="guests" defaultValue="1">{Array.from({length:eventConfig.rsvp.maxGuests},(_,i)=><option value={i+1} key={i}>{i+1} {i === 0 ? "guest" : "guests"}</option>)}</select></div>}<div className="field"><label htmlFor="guest-note">A little note <span className="muted">(optional)</span></label><textarea id="guest-note" name="note" rows={3} maxLength={1500} placeholder="Anything you’d like us to know…"/></div>{error && <p role="alert" className="form-error">{error}</p>}<p className="local-notice">Preview invitation: replies are saved on this device only and are not yet sent to the hosts.</p><button className="stationery-button submit-button" type="submit" disabled={status === "saving"}>{status === "saving" ? "SAVING YOUR REPLY…" : "RSVP"}<span aria-hidden="true">↗</span></button></motion.form>}</AnimatePresence></div><Flourish/></section>;
}
