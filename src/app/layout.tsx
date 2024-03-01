import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Twitter: A Decentralized Social Media Platform",
  description: "Twitter: A Decentralized Social Media Platform",
  icons: {
    icon: [
      {
        href: "/logo.png",
        url: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>{children}</body>
    </html>
  );
}
