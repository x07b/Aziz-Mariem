import { eventConfig } from "@/config/event";

export function Branch({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 280" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth=".8" strokeLinecap="round">
    <path d="M77 270C84 221 46 175 86 115S112 35 97 9M79 239Q40 216 24 188M74 209Q112 190 138 161M74 179Q38 153 22 128M84 135Q125 119 143 87M99 96Q62 70 53 43M102 58Q127 40 137 19" />
    {[{x:31,y:195,r:-38},{x:47,y:212,r:-48},{x:77,y:225,r:25},{x:106,y:189,r:48},{x:128,y:171,r:42},{x:47,y:159,r:-42},{x:26,y:134,r:-28},{x:78,y:173,r:20},{x:111,y:119,r:48},{x:134,y:99,r:38},{x:73,y:71,r:-37},{x:55,y:46,r:-22},{x:98,y:98,r:-5},{x:122,y:37,r:42},{x:98,y:31,r:-18}].map((leaf,i)=><g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}><path d="M0 0C-18-12-16-31-9-38C3-29 8-13 0 0Z"/><path d="M0 0Q-7-17-9-38M-4-11l-8-5M-6-20l6-6"/></g>)}
    <path d="M96 17q-12-16-3-17q13 3 3 17Z" />
  </g></svg>;
}
export function Flourish({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 260 44" fill="none" className={`flourish ${className}`} aria-hidden="true"><g stroke="currentColor" strokeWidth=".85"><path d="M9 26h69q32 0 44-13M251 26h-69q-32 0-44-13M76 26q-20-22-33-12q-7 8 5 9q9 0 2-6M184 26q20-22 33-12q7 8-5 9q-9 0-2-6M107 23q-10 13-21 6M153 23q10 13 21 6M130 6c-15 10-13 18 0 28c13-10 15-18 0-28Z"/><path d="M130 13v15M64 26q-8 11-19 8M196 26q8 11 19 8"/><circle cx="130" cy="40" r="1"/></g></svg>;
}
export function Monogram({ className = "" }: { className?: string }) {
  return <div className={`monogram ${className}`} aria-label="الحروف الأولى لاسمي عزيز ومريم"><Branch className="wreath-left"/><span>{eventConfig.couple.initials[0]}<i>&</i>{eventConfig.couple.initials[1]}</span><Branch className="wreath-right"/></div>;
}
export function BotanicalSprig() { return <div className="botanical-sprig"><Branch/><Branch/></div>; }

export function TimelineIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    door: <><path d="M16 50V17a16 16 0 0 1 32 0v33M12 50h40M23 49V18a9 9 0 0 1 18 0v31M32 10v39M23 21h18"/><circle cx="28" cy="34" r="1"/><circle cx="36" cy="34" r="1"/><path d="M7 49V31m-4 5q4-13 8 0M57 49V31m-4 5q4-13 8 0"/></>,
    rings: <><circle cx="24" cy="34" r="16"/><circle cx="41" cy="34" r="16"/><path d="m34 16 7-9 7 9-7 8-7-8ZM34 16h14M41 7v17M13 32a11 11 0 0 1 9-9"/></>,
    camera: <><path d="M7 20h12l5-7h16l5 7h12v30H7ZM13 26h5M46 26h5"/><circle cx="32" cy="35" r="11"/><circle cx="32" cy="35" r="7"/><path d="M9 20v-4h8v4"/></>,
    cake: <><path d="M9 49h46M13 48V31h38v17M20 31V19h24v12M13 36q5 8 10 0q5 8 10 0q5 8 10 0q4 8 8 0M20 23q6 8 12 0q6 8 12 0M32 19v-7M32 11q-5-5 0-10q5 5 0 10Z"/></>,
    dinner: <><circle cx="34" cy="31" r="19"/><circle cx="34" cy="31" r="14"/><path d="M6 10v17q4 5 8 0V10M10 10v43M59 10v43M59 10q-9 8-4 20h4"/></>,
    music: <><path d="M26 42V12l25-5v30M26 20l25-5"/><ellipse cx="19" cy="43" rx="7" ry="5" transform="rotate(-25 19 43)"/><ellipse cx="44" cy="38" rx="7" ry="5" transform="rotate(-25 44 38)"/><path d="M9 13v10M4 18h10M46 50v8M42 54h8"/></>,
  };
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type] || paths.rings}</svg>;
}
