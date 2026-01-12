import { getDictionary } from "@/dictionaries/get-dictionary";
import LottoGenerator from "@/components/LottoGenerator";
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
        title: dict.tools.lotto_generator.title,
        description: dict.tools.lotto_generator.description,
        path: '/tools/lotto-generator',
        lang,
        keywords: dict.tools.lotto_generator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function LottoGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.lotto_generator.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.lotto_generator.description}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                    <LottoGenerator
                        labels={{
                            generate: dict.tools.lotto_generator.generate,
                            save: dict.tools.lotto_generator.save,
                            saved_numbers: dict.tools.lotto_generator.saved_numbers,
                            no_saved: dict.tools.lotto_generator.no_saved,
                        }}
                    />
                </div>

                <div className="max-w-3xl mx-auto px-6 py-12">
                    <RichContentSection content={dict.tools.lotto_generator as ToolContent} />
                </div>

                <RelatedTools
                    currentSlug="lotto-generator"
                    category="daily"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.lotto_generator.title}
                    description={dict.tools.lotto_generator.description}
                    url={`https://cheetset.com/${lang}/tools/lotto-generator`}
                />
            </div>
        </div>
    );
}
