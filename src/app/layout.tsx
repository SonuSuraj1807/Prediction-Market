import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#030712',
};

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Predict the Future`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['prediction market', 'trading', 'forecasting', 'virtual currency', 'events'],
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: APP_NAME,
    title: `${APP_NAME} — Predict the Future`,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — Predict the Future`,
    description: APP_DESCRIPTION,
  },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-gray-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
