import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/(public)/globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pilav Tour",
  description: "The best Tour Agency in Central Asia",
};
// export async function generateMetadata() {
//   const ogImage = `https://kidscity.uz/logo.png`;

//   return {
//     title: "Pilav Tour",
//     description: "Лучшее ТурАгенство в Узбекистане, мы предлагаем туры по самым выгодным ценам!",
//     ogImage: ogImage,
//     keywords:
//       "Туры и полеты Узбекистан, туры в Узбекистан, дешевые туры, туры, путешествия по выгодным ценам, pilav tour",
//     openGraph: {
//       title: "Лучшее тур агенство в Узбекистане — Pilav Tour",
//       description:
//         "Качественная детская одежда для девочек и мальчиков. Быстрая доставка по Самарканду.",
//       type: "website",
//       siteName: "Kids City",
//       url: "https://www.kidscity.uz",
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: "Kids City logo",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Лучшая детская одежда в Самарканде - Kids City",
//       description:
//         "Магазин детской одежды в Самарканде. Модные вещи для мальчиков и девочек.",
//       site: "@kidscity",
//       images: [ogImage],
//     },
//   };
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
