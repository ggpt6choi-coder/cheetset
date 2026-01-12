import { Metadata } from 'next';

export const BASE_URL = 'https://www.cheetset.com';
export const LANGUAGES = ['en', 'ko', 'ja'];

interface MetadataProps {
    title: string;
    description: string;
    path: string;
    lang: string;
    image?: string;
    keywords?: string[];
    noIndex?: boolean;
}

export function constructMetadata({
    title,
    description,
    path,
    lang,
    image = '/og-image.png',
    keywords = [],
    noIndex = false,
}: MetadataProps): Metadata {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Ensure we don't have double slashes if path is accidentally empty or just /
    // Logic: BASE_URL + / + lang + cleanPath
    // If cleanPath is just /, we might end up with /en/.
    // Let's normalize. 

    // Standard format: https://www.cheetset.com/en/tools/pomodoro
    const fullUrl = `${BASE_URL}/${lang}${cleanPath === '/' ? '' : cleanPath}`;

    const alternates = {
        canonical: fullUrl,
        languages: LANGUAGES.reduce((acc, l) => {
            // Create links for all languages: /en/path, /ko/path, /ja/path
            acc[l] = `${BASE_URL}/${l}${cleanPath === '/' ? '' : cleanPath}`;
            return acc;
        }, {} as Record<string, string>),
    };

    return {
        title,
        description,
        keywords,
        metadataBase: new URL(BASE_URL),
        alternates,
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName: 'CheetSet',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
