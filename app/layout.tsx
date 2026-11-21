import type { Metadata } from "next";
import "../client/src/index.css";

export const metadata: Metadata = {
  title: "Unscaled — Beyond the Scale, Observer's Freedom",
  description:
    "Selected projects, Hugging Face, GitHub, and essays beyond hardware metrics.",
  icons: {
    icon: {
      url: "/unscaled-logo-hd.png",
      type: "image/png",
      sizes: "1248x1248",
    },
    apple: "/unscaled-logo-hd.png",
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
