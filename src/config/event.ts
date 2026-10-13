export type Photo = { src: string; alt: string; position?: string };
export type Location = { label: string; time: string | null; venue: string | null; address: string | null; googleMapsUrl: string | null; mapEmbedUrl: string | null };
export type TimelineIcon = "door" | "rings" | "camera" | "cake" | "dinner" | "music";

/** All personal details live here. Null dates/places render honest announcement copy.
 * Use an ISO date with an explicit offset, e.g. 2027-06-12T18:00:00+01:00.
 * Photos can be local paths in /public/images. Missing files gracefully show artwork.
 */
export const eventConfig = {
  couple: { firstPerson: "Aziz", secondPerson: "Mariem", initials: ["A", "M"] },
  storytelling: {
    bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    verse: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾",
    scene: "/images/doorway-scene-beige.webp",
    sceneAlt: "Aziz in beige and Mariem in an ivory gown and hijab, holding hands before an ornate doorway.",
    fabric: "/images/ivory-fabric.webp",
  },
  event: {
    type: "Engagement", name: "Our Khotba", date: "2026-10-24T20:00:00+01:00" as string | null,
    timeZone: "Africa/Tunis", locale: "en-GB",
    locations: [ {
      label: "Location",
      time: "8:00 pm",
      venue: null,
      address: "El Omran, Jbal Lahmar",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=36.82467802712746%2C10.153047196391178",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6387.485991074849!2d10.153047196391178!3d36.82467802712746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3370bc6ee22f%3A0x2c0cb90aa891e4a9!2sJbal%20Lahmar%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1791374066995!5m2!1sfr!2stn",
    } ] as Location[],
  },
  // Add a video under public/videos and set this to its URL, e.g. "/videos/cover.mp4".
  introVideoSrc: "/videos/cover.mp4" as string | null,
  cover: { poster: "/videos/cover-poster.jpg", subtitle: "Fête de fiançailles", button: "Ouvrir l’invitation" },
  // Replace this file with your preferred track when ready.
  music: { src: "/music/song.wav", enabled: true, volume: 0.65, fadeDuration: 1800 },
  contact: { phone: null as string | null },
  photos: {
    hero: { src: "/images/couple-hero.jpg", alt: "لحظة هادئة معًا — صورة توضيحية", position: "center 45%" },
    aziz: { src: "/images/aziz-childhood.jpeg", alt: "عزيز في طفولته", position: "center 28%" },
    mariem: { src: "/images/mariem-childhood.jpeg", alt: "مريم في طفولتها", position: "center 28%" },
    couple: { src: "", alt: "صورة لعزيز ومريم قريبًا" },
    second: { src: "/images/couple-hero.jpg", alt: "لحظة رقيقة معًا", position: "center 45%" },
    scenic: { src: "/images/scenic.jpg", alt: "حديقة هادئة قرب البحيرة" },
    venue: { src: "", alt: "مكان الاحتفال قريبًا" },
    details: { src: "", alt: "تفصيل من الاحتفال" },
  } satisfies Record<string, Photo>,
  story: "Two hearts, one promise, and a beautiful new chapter we’d love to begin with you.",
  timeline: [
    { time: null, title: "Welcome", icon: "door" },
    { time: null, title: "Khotba", icon: "rings" },
    { time: null, title: "Photos", icon: "camera" },
    { time: null, title: "Celebrate", icon: "music" },
  ] as { time: string | null; title: string; icon: TimelineIcon }[],
  dressCode: {
    description: "Our colours for the evening.",
    note: "",
    colors: [{ name: "Aziz · Beige", hex: "#c5b298" }, { name: "Mariem · Ivory", hex: "#e9dfcd" }],
  },
  smallNote: { enabled: true, title: "A Small Note", text: "Your presence is the most meaningful gift to us. We simply can’t wait to celebrate this special moment together." },
  rsvp: {
    deadline: null as string | null, maxGuests: 6,
    message: "We’d love for you to be part of our celebration. Please let us know if you can make it.",
    successAccept: "We can’t wait to celebrate with you.",
    successDecline: "You’ll be with us in spirit. Thank you for letting us know.",
  },
};
export const coupleNames = `${eventConfig.couple.firstPerson} & ${eventConfig.couple.secondPerson}`;
export const invitationNames = `${eventConfig.couple.secondPerson} & ${eventConfig.couple.firstPerson}`;
export type InvitationLanguage = "fr" | "en";
const { firstPerson: aziz, secondPerson: mariem } = eventConfig.couple;
export const invitationCopy = {
  fr: {
    locale: "fr-FR", coverSubtitle: "Fête de fiançailles", enter: "Ouvrir l’invitation", close: "Refermer l’invitation",
    announcement: `C'est officiel ! ${mariem} et ${aziz} se fiancent !`,
    introduction: "On adorerait fêter cette magnifique étape avec vous",
    journey: "Deux cœurs, une même histoire...",
    invitation: `${mariem} & ${aziz} sont heureux de vous inviter à partager leur bonheur à l'occasion de leurs fiançailles.`,
    withLove: "Avec amour", details: "Les détails", occasion: "Notre célébration", dateTime: "La date & l’heure", place: "Le lieu", maps: "Voir l’itinéraire", mapTitle: "Lieu des fiançailles à Jbal Lahmar, Tunis",
    evening: "Au fil de la soirée", timeline: "Nos beaux moments", countdown: "Chaque instant nous rapproche",
    units: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" }, remaining: "avant notre célébration", pending: "À annoncer", begun: "Notre nouveau chapitre a commencé.",
    moments: { Welcome: "Bienvenue", Khotba: "Fiançailles", Photos: "Souvenirs en images", Celebrate: "Célébrons ensemble" } as Record<string,string>,
    scene: "Un nouveau chapitre", sceneAlt: "Aziz en costume beige et Mariem en robe ivoire et hijab, main dans la main devant une porte sculptée. La traîne se prolonge sous l’invitation.",
    scroll: "L’histoire se déroule", childhood: "Nos souvenirs d’enfance", azizPhoto: `${aziz}, enfant`, mariemPhoto: `${mariem}, enfant`,
    musicPlay: "Activer la musique", musicMute: "Couper la musique", musicUnavailable: "Musique indisponible", switchLanguage: "Read the invitation in English",
  },
  en: {
    locale: "en-GB", coverSubtitle: "Our engagement celebration", enter: "Open the invitation", close: "Close the invitation",
    announcement: `It's official! ${mariem} and ${aziz} are getting engaged!`,
    introduction: "We would love to celebrate this wonderful milestone with you on",
    journey: "Two hearts, one journey...",
    invitation: `${mariem} & ${aziz} are thrilled to invite you to share in their happiness as they celebrate their engagement.`,
    withLove: "With love", details: "The details", occasion: "Our celebration", dateTime: "The date & time", place: "The place", maps: "Open in Maps", mapTitle: "Engagement location in Jbal Lahmar, Tunis",
    evening: "As the evening unfolds", timeline: "Our beautiful moments", countdown: "Every moment brings us closer",
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" }, remaining: "until our celebration", pending: "To be announced", begun: "Our beautiful new chapter has begun.",
    moments: { Welcome: "Welcome", Khotba: "Engagement", Photos: "Making memories", Celebrate: "Celebrate together" } as Record<string,string>,
    scene: "A beautiful beginning", sceneAlt: "Aziz in a beige suit and Mariem in an ivory gown and hijab, holding hands before a carved doorway. Her train flows beneath the invitation.",
    scroll: "Let the story unfold", childhood: "Our childhood memories", azizPhoto: `${aziz} as a child`, mariemPhoto: `${mariem} as a child`,
    musicPlay: "Play music", musicMute: "Mute music", musicUnavailable: "Music unavailable", switchLanguage: "Lire l’invitation en français",
  },
};
