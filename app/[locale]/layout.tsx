import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
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

const rubik = Rubik({
  variable: "--font-rubik",
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
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale: string) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}> )
{
  const {resources} = await initTranslations(locale, i18Namespaces);
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${rubik.className} ${inter.className} antialiased`}
      >
        <Providers locale={locale} namespaces={i18Namespaces} resources={resources}>
              <main className="w-full">{ children }</main>
              <Toaster />
       </Providers>
      </body>
    </html>
  );
}
