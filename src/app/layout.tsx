import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/italianno/400.css";
import "@fontsource/lora/latin-400.css";
import "@fontsource/lora/latin-600.css";
import "@fontsource/lora/latin-700.css";
import "@fontsource/noto-naskh-arabic/arabic-400.css";
import "@fontsource/noto-naskh-arabic/arabic-500.css";
import "@fontsource/noto-naskh-arabic/arabic-600.css";
import "@fontsource/aref-ruqaa-ink/arabic-400.css";
import "./globals.css";
import "./gown-story.css";
import "./cover.css";
import "./invitation-editorial.css";
export const metadata: Metadata = { title: "Mariem & Aziz | Fête de fiançailles", description: "Deux cœurs, une même histoire. Mariem & Aziz vous invitent à célébrer leurs fiançailles.", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}<noscript><div className="noscript-note">Mariem & Aziz — Fête de fiançailles. Activez JavaScript pour ouvrir l’invitation. Enable JavaScript to open the invitation.</div></noscript></body></html>;
}
