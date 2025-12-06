import { getDictionary } from "@/dictionaries/get-dictionary";
import UnitConverterClient from "@/components/tools/UnitConverterClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.unit_converter.title} - ${dict.common.title}`,
        description: dict.tools.unit_converter.description,
        keywords: ['unit converter', 'length converter', 'weight converter', '단위 변환기', '무게 변환', '길이 변환'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/unit-converter`,
        },
        openGraph: {
            title: `${dict.tools.unit_converter.title} - ${dict.common.title}`,
            description: dict.tools.unit_converter.description,
            url: `https://cheetset.com/${lang}/tools/unit-converter`,
            type: 'website',
        },
    };
}

export default async function UnitConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.unit_converter.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.unit_converter.description}
                    </p>
                </div>

                <UnitConverterClient
                    labels={{
                        length: dict.tools.unit_converter.length,
                        weight: dict.tools.unit_converter.weight,
                        volume: dict.tools.unit_converter.volume,
                        area: dict.tools.unit_converter.area,
                        temperature: dict.tools.unit_converter.temperature,
                        input: dict.tools.unit_converter.input,
                        result: dict.tools.unit_converter.result,
                        select_unit: dict.tools.unit_converter.select_unit,
                    }}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.unit_converter.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="unit-converter"
                    category="daily"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.unit_converter.title}
                    description={dict.tools.unit_converter.description}
                    url={`https://cheetset.com/${lang}/tools/unit-converter`}
                />
            </div>
        </div>
    );
}
