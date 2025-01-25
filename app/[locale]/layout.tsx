import type { Metadata, Viewport } from "next";
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

const APP_NAME = "Observer Election System";
const APP_DEFAULT_TITLE = "Observer Election System";
const APP_TITLE_TEMPLATE = "%s - Observer Election System";
const APP_DESCRIPTION = "Observer Election System";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "Ismail Salah",
      url: "www.linkedin.com/in/ismail-junior-60b876247",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/maskable_icon_x512.png" },
    { rel: "icon", url: "icons/maskable_icon_x512.png" },
    { rel: "icon", url: "icons/maskable_icon_x192.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
