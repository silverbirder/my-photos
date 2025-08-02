import "the-new-css-reset/css/reset.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const baseUrl = process.env.BASE_URL ?? "https://silverbirder-cork-board.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "cork board",
  description: "A virtual cork board for my photos",
  robots: {
    index: true,
  },
  icons: [{ rel: "icon", url: "/icon/48" }],
};

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={geist.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
