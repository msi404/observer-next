import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import {dir} from "i18next";

import { i18nConfig } from '@/app/_config/i18nConfig'
import initTranslations from '@/app/_config/i18n'
import {Providers} from '@/app/_providers/providers'
import { Toaster } from "@/app/_components/ui/toaster";
import "../_style/globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
} );

const noto = Noto_Kufi_Arabic({
  variable: "--font-tajawal",
  subsets: ["arabic"],
} );

const i18Namespaces = [
  "common",
  "home",
  "stateMangers",
  "electionResults",
  "dataEntries",
  "observers",
  "candidates",
  "electionBase" ];

export const metadata: Metadata = {
  title: "برنامج المراقب",
  description: "برنامج المراقب الخاص بادارة العملية الانتخابية.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Ismail Salah",
      url: "www.linkedin.com/in/ismail-junior-60b876247",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/next.svg" },
    { rel: "icon", url: "icons/next.svg" },
  ],
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale: string) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}> )
{
  const {locale} = await params
  const {resources} = await initTranslations(locale, i18Namespaces);
  return (
    <html lang={ locale } dir={ dir( locale ) }>
      <body
        className={`${noto.className} ${inter.className} antialiased`}
      >
        <Providers locale={locale} namespaces={i18Namespaces} resources={resources}>
          <main className="w-full">{ children }</main>
          <Toaster />
       </Providers>
      </body>
    </html>
  );
}
