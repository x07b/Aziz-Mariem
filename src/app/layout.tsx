import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/italianno/400.css";
import "@fontsource/noto-naskh-arabic/arabic-400.css";
import "@fontsource/noto-naskh-arabic/arabic-500.css";
import "@fontsource/noto-naskh-arabic/arabic-600.css";
import "@fontsource/aref-ruqaa-ink/arabic-400.css";
import "./globals.css";
import "./gown-story.css";
import "./cover.css";
export const metadata: Metadata = { title: `عزيز ومريم | دعوة الخطوبة`, description: `دعوة خطوبة عزيز ومريم`, robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar-TN"><body>{children}<noscript><div className="noscript-note">عزيز ومريم يدعوانكم للاحتفال بخطوبتهما.</div></noscript></body></html>;
}
