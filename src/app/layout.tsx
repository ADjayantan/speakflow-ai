import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/shared/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeakFlow AI | American English Fluency for Tamil Speakers",
  description:
    "A strict, supportive AI spoken English coach that helps Tamil speakers build fluent American-accent English in 90 days.",
  keywords: [
    "spoken English",
    "Tamil speakers",
    "American accent",
    "AI speaking coach",
    "pronunciation trainer",
    "English fluency",
  ],
  authors: [{ name: "SpeakFlow AI" }],
  openGraph: {
    title: "SpeakFlow AI",
    description: "Stop Translating. Start Speaking.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
