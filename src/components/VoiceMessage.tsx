"use client";
import { useRef, useState, type CSSProperties } from "react";
import { useInvitation } from "./InvitationLanguage";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function VoiceMessage({ onPlay, onPause, onClose }: { onPlay: () => void; onPause: () => void; onClose: () => void }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);
  const { t } = useInvitation();
  const hasDuration = Number.isFinite(duration) && duration > 0;

  async function togglePlayback() {
    const element = audio.current;
    if (!element || failed) return;
    if (playing) {
      element.pause();
      return;
    }
    try {
      await element.play();
    } catch {
      setFailed(true);
    }
  }

  function seek(value: string) {
    const time = Number(value);
    if (!Number.isFinite(time)) return;
    setCurrentTime(time);
    if (audio.current) audio.current.currentTime = time;
  }

  function closeMessage() {
    audio.current?.pause();
    onPause();
    onClose();
  }

  return <section className="mariem-gift" id="mariem-gift" aria-labelledby="mariem-gift-heading">
    <audio ref={audio} className="voice-message-audio" preload="metadata" src="/audio/for-mariem.wav"
      aria-hidden="true" tabIndex={-1}
      onPlay={event => { setPlaying(true); setDuration(event.currentTarget.duration); onPlay(); }}
      onPause={() => { setPlaying(false); onPause(); }}
      onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
      onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
      onDurationChange={event => setDuration(event.currentTarget.duration)}
      onEnded={() => { setPlaying(false); setCurrentTime(0); onPause(); }}
      onError={() => { setFailed(true); setPlaying(false); onPause(); }}/>
    <div className="voice-message-card">
      <div className="voice-message-heading">
        <span className="voice-message-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 27s-10-6.1-10-13.2A5.8 5.8 0 0 1 16 10a5.8 5.8 0 0 1 10 3.8C26 20.9 16 27 16 27Z"/>
            <path d="M10 16h2l1.5-3 3 7 2.5-5 1.2 2H23"/>
          </svg>
        </span>
        <div className="voice-message-copy">
          <p className="meta" id="mariem-gift-heading">{t.mariemGift}</p>
          <p className="voice-message-note">{t.mariemGiftNote}</p>
        </div>
        <button className="voice-play-button" type="button" onClick={() => void togglePlayback()}
          disabled={failed} aria-label={failed ? t.voiceUnavailable : playing ? t.voicePause : t.voicePlay}>
          {playing
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 10 6-10 6V6Z"/></svg>}
        </button>
        <button className="voice-close-button" type="button" onClick={closeMessage} aria-label={t.voiceClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>
        </button>
      </div>
      {failed
        ? <p className="voice-message-error" role="status">{t.voiceUnavailable}</p>
        : <div className="voice-message-progress">
          <span className="voice-message-time" aria-label={t.voiceSeek}>{formatTime(currentTime)}</span>
          <input className="voice-message-seek" type="range" min="0" max={hasDuration ? duration : 0} step="0.1"
            value={hasDuration ? Math.min(currentTime, duration) : 0} disabled={!hasDuration}
            aria-label={t.voiceSeek} style={{ "--voice-progress": `${hasDuration ? currentTime / duration * 100 : 0}%` } as CSSProperties}
            onChange={event => seek(event.currentTarget.value)}/>
          <span className="voice-message-time">{hasDuration ? formatTime(duration) : "--:--"}</span>
        </div>}
    </div>
  </section>;
}
