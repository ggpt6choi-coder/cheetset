import { getDictionary } from "@/dictionaries/get-dictionary";
import WordCounter from "@/components/WordCounter";
import type { Metadata } from "next";

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
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.tools.word_counter.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {dict.tools.word_counter.description}
                </p>
            </div>

            <WordCounter
                labels={{
                    placeholder: dict.tools.word_counter.placeholder,
                    result: dict.tools.word_counter.result
                }}
            />

            <div className="mt-16 max-w-3xl mx-auto prose dark:prose-invert">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        About this Tool
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {dict.tools.word_counter.seo_content}
                    </p>
                </div>
            </div>
        </div>
    );
}
