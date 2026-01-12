import { getDictionary } from "@/dictionaries/get-dictionary";
import WordCounter from "@/components/WordCounter";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.word_counter.title,
        description: dict.tools.word_counter.description,
        path: '/tools/word-counter',
        lang,
        keywords: dict.tools.word_counter.keywords || [], // Fallback if keywords property is not guaranteed
    });
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

                <RichContentSection content={dict.tools.word_counter as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="word-counter"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.word_counter.title}
                description={dict.tools.word_counter.description}
                url={`https://www.cheetset.com/${lang}/tools/word-counter`}
            />
        </div>
    );
}
