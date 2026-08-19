import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { LenisProvider } from "@/lib/LenisContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.soficca.com'),
  title: "Soficca — Clinical Decision Infrastructure",
  description: "Soficca is clinical decision infrastructure. Cardio Pilot is the live proof — AI signal extraction with governed routing, safety overrides, and audit-ready output.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Soficca — Clinical Decision Infrastructure",
    description: "Soficca is clinical decision infrastructure. Cardio Pilot is the live proof — AI signal extraction with governed routing, safety overrides, and audit-ready output.",
    url: 'https://www.soficca.com',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={{
        "--font-space-grotesk": "'Space Grotesk', sans-serif",
        "--font-plus-jakarta-sans": "'Plus Jakarta Sans', sans-serif",
        "--font-jetbrains-mono": "'JetBrains Mono', monospace",
      } as React.CSSProperties}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
