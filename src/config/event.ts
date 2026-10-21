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
      address: "Ras Ettabia",
      googleMapsUrl: "https://www.google.com/maps?cid=4844040697255593779",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.086002676934!2d10.1477744!3d36.816459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33a1d8e98399%3A0x43397d596d748733!2sRas%20Ettabia%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1792499722841!5m2!1sfr!2stn",
    } ] as Location[],
  },
  // Add a video under public/videos and set this to its URL, e.g. "/videos/cover.mp4".
  introVideoSrc: "/videos/cover.mp4" as string | null,
  proposal: { src: "/videos/proposal.mp4", poster: "/videos/proposal-poster.jpg" },
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
export type InvitationLanguage = "fr" | "en" | "ar";
const { firstPerson: aziz, secondPerson: mariem } = eventConfig.couple;
export const invitationCopy = {
  fr: {
    letterHeading: "",
    loveLetter: "Nous ne savions pas que, parmi tous les destins possibles, l’un nous réservait un cœur auprès duquel trouver la paix, une âme où reconnaître un peu de la nôtre.\n\nPuis Dieu nous a réunis. Notre rencontre est devenue sérénité, notre tendresse une promesse, et notre amour une prière : rester ensemble aussi longtemps que la vie nous le permettra.\n\nAujourd’hui, nous avançons vers le plus beau de nos destins, cœur contre cœur, une vie pour une vie. Nous aimerions vous avoir près de nous quand cette promesse fleurira en joie et que notre histoire commencera au nom de Dieu.",
    childhoodLabel: "Avant de nous rencontrer…",
    celebration: "Le {date}, retrouvons-nous pour célébrer l’amour.",
    forever: "Pour toujours, nous.", enableSound: "Écouter ce moment", filmUnavailable: "Ce souvenir ne se charge pas pour le moment.", openFilm: "Ouvrir le film",
    filmAudio: "La musique laisse place à notre film.", languageStatus: "Français · Passer à l’arabe",
    locale: "fr-FR", coverNote: "Le début de notre toujours", proposalTitle: "Et elle a dit oui.", proposalNote: "Un instant à nous, que l’on voulait partager avec vous.", proposalLabel: "Notre plus beau oui", coverSubtitle: "Fête de fiançailles", enter: "Ouvrir l’invitation", close: "Refermer l’invitation",
    announcement: "On se dit oui.",
    introduction: "Avec vous, c’est encore plus beau.",
    journey: "Nous étions deux histoires encore inconnues, jusqu’à ce que le destin nous réunisse sur une même ligne.",
    invitation: "Nous avons grandi sur deux chemins différents, sans savoir que chaque pas rapprochait nos cœurs, et que le plus beau cadeau que les jours nous réservaient… c’était nous.",
    withLove: "Avec amour", mariemGift: "Un message pour Mariem", mariemGiftNote: "Quelques mots doux, rien que pour toi.", voiceOpen: "Ouvrir le message privé", voiceClose: "Refermer le message", voicePlay: "Écouter le message", voicePause: "Mettre le message en pause", voiceSeek: "Avancement du message", voiceUnavailable: "Le message vocal est indisponible.", occasion: "Le grand jour", dateTime: "La date & l’heure", place: "Le lieu", maps: "Voir l’itinéraire", mapTitle: "Localisation : Ras Ettabia, Tunis",
    evening: "Au fil de la soirée", timeline: "Nos beaux moments", countdown: "Bientôt, tous ensemble.",
    units: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" }, remaining: "avant notre célébration", pending: "À annoncer", begun: "Notre nouveau chapitre a commencé.",
    moments: { Welcome: "Bienvenue", Khotba: "Fiançailles", Photos: "Souvenirs en images", Celebrate: "Célébrons ensemble" } as Record<string,string>,
    scene: "Un nouveau chapitre", sceneAlt: "Aziz en costume beige et Mariem en robe ivoire et hijab, main dans la main devant une porte sculptée. La traîne se prolonge sous l’invitation.",
    scroll: "L’histoire se déroule", childhood: "Nos souvenirs d’enfance", azizPhoto: `${aziz}, enfant`, mariemPhoto: `${mariem}, enfant`,
    musicPlay: "Activer la musique", musicMute: "Couper la musique", musicUnavailable: "Musique indisponible", switchLanguage: "Langue actuelle : français. Lire l’invitation en arabe.",
  },
  en: {
    letterHeading: "",
    loveLetter: "We never knew that, among all the paths written for us, one held a heart we could rest in, and a soul in which we would recognise something of our own.\n\nThen God brought us together. Our meeting became peace, our tenderness a promise, and our love a prayer to stay together for all the years we are given.\n\nToday, we walk towards the most beautiful part of our destiny, heart to heart, a lifetime for a lifetime. We would love you beside us as our promise blossoms into joy and our story begins in God’s name.",
    childhoodLabel: "Before we met…",
    celebration: "On {date}, come celebrate this love with us.",
    forever: "Forever, us.", enableSound: "Hear this moment", filmUnavailable: "This memory could not load just now.", openFilm: "Open the film",
    filmAudio: "The music is paused for our film.", languageStatus: "English · Switch to French",
    locale: "en-GB", coverNote: "The beginning of our forever", proposalTitle: "And she said yes.", proposalNote: "A moment just for us, a memory to share with you.", proposalLabel: "Our sweetest yes", coverSubtitle: "Our engagement celebration", enter: "Open the invitation", close: "Close the invitation",
    announcement: "We’re saying yes.",
    introduction: "It means even more with you there.",
    journey: "We were two stories yet untold, until destiny brought us into the same line.",
    invitation: "We grew up on different paths, never knowing that each step was bringing our hearts closer, or that the loveliest thing the years had waiting for us… was us.",
    withLove: "With love", mariemGift: "A message for Mariem", mariemGiftNote: "A few heartfelt words, just for you.", voiceOpen: "Open the private message", voiceClose: "Close the message", voicePlay: "Play voice message", voicePause: "Pause voice message", voiceSeek: "Voice message progress", voiceUnavailable: "The voice message is unavailable.", occasion: "Our day", dateTime: "The date & time", place: "The place", maps: "Open in Maps", mapTitle: "Location: Ras Ettabia, Tunis",
    evening: "As the evening unfolds", timeline: "Our beautiful moments", countdown: "Together, very soon.",
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" }, remaining: "until our celebration", pending: "To be announced", begun: "Our beautiful new chapter has begun.",
    moments: { Welcome: "Welcome", Khotba: "Engagement", Photos: "Making memories", Celebrate: "Celebrate together" } as Record<string,string>,
    scene: "A beautiful beginning", sceneAlt: "Aziz in a beige suit and Mariem in an ivory gown and hijab, holding hands before a carved doorway. Her train flows beneath the invitation.",
    scroll: "Let the story unfold", childhood: "Our childhood memories", azizPhoto: `${aziz} as a child`, mariemPhoto: `${mariem} as a child`,
    musicPlay: "Play music", musicMute: "Mute music", musicUnavailable: "Music unavailable", switchLanguage: "Current language: English. Read the invitation in French.",
  },
  ar: {
    locale: "ar-TN",
    letterHeading: "",
    loveLetter: "وما كنّا نعلمُ أنَّ من بينِ كلِّ الأقدارِ قدرًا يُخبِّئُ لنا قلبًا نطمئنُّ إليه، وروحًا نرى فيها شيئًا من أرواحِنا.\n\nحتى جمعنا الله، فصار اللقاءُ سكينةً، وصارت المودّةُ عهدًا، وصار الحُبُّ دعاءً بأن نبقى معًا ما بقيَ العُمر.\n\nوها نحن اليوم نمضي إلى أجملِ أقدارِنا، قلبًا لقلبٍ، وعُمرًا لعُمر، ونودُّ أن تكونوا معنا حين يُزهرُ الوعدُ فرحًا، وتبدأُ حكايتُنا باسمِ الله.",
    childhoodLabel: "قبل أن نلتقي…",
    celebration: "يوم {date}، نلتقي لنفرح معًا بهذا الحبّ.",
    forever: "معًا، دائمًا.", enableSound: "اسمعوا هذه اللحظة", filmUnavailable: "تعذّر تحميل هذه الذكرى الآن.", openFilm: "افتح الفيديو",
    filmAudio: "توقّفت الموسيقى لتسمعوا حكايتنا.", languageStatus: "العربية · الانتقال إلى الفرنسية",
    coverNote: "بداية عمر يجمعنا", proposalTitle: "وقالت نعم.", proposalNote: "لحظة تخصّنا، أحببنا أن نشارككم فرحتها.", proposalLabel: "أجمل نعم في حكايتنا",
    coverSubtitle: "دعوة خطوبتنا", enter: "افتح الدعوة", close: "أغلق الدعوة",
    announcement: "", introduction: "", journey: "كنّا حكايتين في علم الغيب، حتى جمعنا القدر في سطرٍ واحد.",
    invitation: "كبرنا على دربين مختلفين، ولم نعلم أنّ كلّ خطوةٍ كانت تقرّب قلبًا من قلب، وأنّ أجمل ما خبّأته لنا الأيام… كان نحن.",
    withLove: "بكلّ الحبّ", mariemGift: "رسالة إلى مريم", mariemGiftNote: "كلمات من القلب، لكِ وحدكِ.", voiceOpen: "افتحي الرسالة الخاصة", voiceClose: "أغلقي الرسالة", voicePlay: "استمعي إلى الرسالة", voicePause: "أوقفي الرسالة مؤقتًا", voiceSeek: "تقدّم الرسالة الصوتية", voiceUnavailable: "الرسالة الصوتية غير متاحة.", occasion: "يوم فرحتنا", dateTime: "اليوم والوقت", place: "المكان", maps: "كيف تصل إلينا", mapTitle: "الموقع: رأس الطابية، تونس",
    evening: "لحظات السهرة", timeline: "", countdown: "قريبًا، نلمّ شملنا.",
    units: { days: "أيّام", hours: "ساعات", minutes: "دقائق", seconds: "ثوانٍ" }, remaining: "حتّى فرحتنا", pending: "نعلن عنه قريبًا", begun: "بدأ فصلنا الجديد.",
    moments: { Welcome: "أهلًا بكم", Khotba: "الخطوبة", Photos: "ذكرياتنا", Celebrate: "نفرح معًا" } as Record<string,string>,
    scene: "بداية حكايتنا", sceneAlt: "عزيز ومريم يمسكان بأيدي بعضهما أمام باب مزخرف.",
    scroll: "تتواصل الحكاية", childhood: "ذكريات طفولتنا", azizPhoto: "عزيز في طفولته", mariemPhoto: "مريم في طفولتها",
    musicPlay: "تشغيل الموسيقى", musicMute: "كتم الموسيقى", musicUnavailable: "الموسيقى غير متاحة", switchLanguage: "اللغة الحالية: العربية. اقرأ الدعوة بالفرنسية.",
  },
};
