import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import { Providers } from '@/app/_providers/providers';
import { Toaster } from '@/app/_components/ui/toaster';
import { Scan } from '@/app/_components/scan';
import './_style/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const noto = Noto_Kufi_Arabic({
  variable: '--font-tajawal',
  subsets: ['arabic']
});

const APP_NAME = 'Observer Election System';
const APP_DEFAULT_TITLE = 'Observer Election System';
const APP_TITLE_TEMPLATE = '%s - Observer Election System';
const APP_DESCRIPTION = 'Observer Election System';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
  authors: [
    {
      name: 'Ismail Salah',
      url: 'www.linkedin.com/in/ismail-junior-60b876247'
    }
  ],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/maskable_icon_x512.png' },
    { rel: 'icon', url: 'icons/maskable_icon_x512.png' },
    { rel: 'icon', url: 'icons/maskable_icon_x192.png' }
  ]
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir='ltr'>
      <body className={ `${ noto.className } ${ inter.className } antialiased` }>
        <Scan />
        <Providers>
          <main className="w-full" dir='rtl'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
