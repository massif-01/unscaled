import type { Metadata } from "next";
import "../client/src/index.css";

export const metadata: Metadata = {
  title: "Unscaled — Beyond the Scale, Observer's Freedom",
  description:
    "Podcast, AI, GitHub projects, and essays beyond hardware metrics.",
  icons: {
    icon: "/favicon.ico?v=3",
    shortcut: "/favicon.ico?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
