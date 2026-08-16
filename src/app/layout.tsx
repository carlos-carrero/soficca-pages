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

export const metadata: Metadata = {
  title: "Soficca — Clinical Decision Infrastructure",
  description: "Evidence-based clinical decision support tools for healthcare professionals",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
