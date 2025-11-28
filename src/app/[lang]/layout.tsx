import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/Header";
import { getDictionary } from "@/dictionaries/get-dictionary";

const inter = Inter({ subsets: ["latin"] });

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
  };
}

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
      <body className={inter.className}>
        <Header lang={lang} dict={dict} />
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
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
