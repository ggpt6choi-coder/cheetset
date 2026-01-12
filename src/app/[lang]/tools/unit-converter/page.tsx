import { getDictionary } from "@/dictionaries/get-dictionary";
import UnitConverterClient from "@/components/tools/UnitConverterClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.unit_converter.title,
        description: dict.tools.unit_converter.description,
        path: '/tools/unit-converter',
        lang,
        keywords: dict.tools.unit_converter.keywords || [], // Fallback if keywords property is not guaranteed
    });
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
                    <RichContentSection content={dict.tools.unit_converter as ToolContent} />
                </div>

                <RelatedTools
                    currentSlug="unit-converter"
                    category="daily"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.unit_converter.title}
                    description={dict.tools.unit_converter.description}
                    url={`https://www.cheetset.com/${lang}/tools/unit-converter`}
                />
            </div>
        </div>
    );
}
