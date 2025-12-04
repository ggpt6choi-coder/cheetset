import { getDictionary } from "@/dictionaries/get-dictionary";
import WordCounter from "@/components/WordCounter";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.word_counter.title} - ${dict.common.title}`,
        description: dict.tools.word_counter.description,
        keywords: [dict.tools.word_counter.title, 'word count', 'character count', 'online tool', 'free'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/word-counter`,
        },
        openGraph: {
            title: `${dict.tools.word_counter.title} - ${dict.common.title}`,
            description: dict.tools.word_counter.description,
            url: `https://cheetset.com/${lang}/tools/word-counter`,
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.tools.word_counter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.tools.word_counter.title} - ${dict.common.title}`,
            description: dict.tools.word_counter.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function WordCounterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.word_counter.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.word_counter.description}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                    <WordCounter
                        labels={{
                            placeholder: dict.tools.word_counter.placeholder,
                            result: dict.tools.word_counter.result
                        }}
                    />
                </div>

                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        About this Tool
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {dict.tools.word_counter.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools
                currentSlug="word-counter"
                category="developer"
                lang={lang}
            />
        </div>
    );
}
