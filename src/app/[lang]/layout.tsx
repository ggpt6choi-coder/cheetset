import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./../globals.css";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from '@next/third-parties/google';
import CookieConsent from "@/components/CookieConsent";
import { getDictionary } from "@/dictionaries/get-dictionary";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const dancing = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing' });

type Locale = "en" | "ko" | "ja";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    metadataBase: new URL('https://cheetset.com'),
    title: dict.common.title,
    description: dict.common.description,
    alternates: {
      languages: {
        'en': '/en',
        'ko': '/ko',
        'ja': '/ja',
      },
    },
    openGraph: {
      title: dict.common.title,
      description: dict.common.description,
      url: `https://cheetset.com/${lang}`,
      siteName: 'Cheetset',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: dict.common.title,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.common.title,
      description: dict.common.description,
      images: ['/og-image.png'],
    },
    verification: {
      other: {
        'naver-site-verification': '8da216d9fb402cb9cd0365bb0f9580e31b9f45d2',
        'google-adsense-account': 'ca-pub-8338629507494018',
      },
    },
    manifest: '/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: dict.common.title,
    },
    icons: {
      icon: '/icons/icon-192x192.png',
      apple: '/icons/icon-192x192.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body className={`${inter.className} ${playfair.variable} ${dancing.variable}`}>
        <Header lang={lang} dict={dict} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://cheetset.com/#website',
                'url': 'https://cheetset.com',
                'name': 'CheetSet',
                'description': dict.common.description,
                'inLanguage': lang,
              },
              {
                '@type': 'Organization',
                '@id': 'https://cheetset.com/#organization',
                'name': 'CheetSet',
                'url': 'https://cheetset.com',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://cheetset.com/logo.png',
                },
              },
            ],
          }}
        />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} {dict.common.title}. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href={`/${lang}/privacy`} className="text-gray-400 hover:text-gray-500">
                {dict.nav.privacy}
              </a>
              <a href={`/${lang}/terms`} className="text-gray-400 hover:text-gray-500">
                {dict.nav.terms}
              </a>
              <a href={`/${lang}/contact`} className="text-gray-400 hover:text-gray-500">
                {dict.nav.contact}
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
        <GoogleAnalytics gaId="G-PKQS2FJ9YE" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8338629507494018"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <CookieConsent
          message={dict.common.cookie_consent?.message || "This website uses cookies."}
          buttonText={dict.common.cookie_consent?.button || "Got it!"}
        />
      </body>
    </html>
  );
}
