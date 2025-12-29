import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import PhotoCalendarClient from './PhotoCalendarClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import RelatedTools from '@/components/tools/RelatedTools';

type Props = {
    params: Promise<{ lang: string }>;
};

type Locale = "en" | "ko" | "ja";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const t = dict.tools.photo_calendar_2025;

    return {
        title: `${t.title} - ${dict.common.title}`,
        description: t.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/photo-calendar-2025`,
        },
        openGraph: {
            title: t.title,
            description: t.description,
            type: 'website',
            images: [
                {
                    url: 'https://cheetset.com/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: t.title,
                },
            ],
        },
    };
}

export default async function PhotoCalendarPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const t = dict.tools.photo_calendar_2025;

    const content = {
        title: t.title,
        description: t.description,
        guide_title: t.how_to,
        guide: [
            { title: "Upload", description: t.how_to_p1 },
            { title: "Customize", description: t.how_to_p2 },
            { title: "Download", description: t.how_to_p3 }
        ],
        faq: [
            { question: t.faq_privacy, answer: t.faq_privacy_answer }
        ],
        use_cases: [
            t.use_case_1,
            t.use_case_2,
            t.use_case_3
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <ToolJsonLd
                name={t.title}
                description={t.description}
                url={`https://cheetset.com/${lang}/tools/photo-calendar-2025`}
                author="CheetSet"
            />

            <div className="text-center mb-12">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
                    {t.title}
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    {t.description}
                </p>
            </div>

            <PhotoCalendarClient dict={dict} />

            <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
                <RichContentSection content={content} />
            </div>

            <RelatedTools currentSlug="photo-calendar-2025" lang={lang} category="image" />
        </div>
    );
}
