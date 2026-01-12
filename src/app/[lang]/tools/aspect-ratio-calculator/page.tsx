import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import AspectRatioCalculatorClient from './AspectRatioCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.aspect_ratio_calculator.title,
        description: dict.tools.aspect_ratio_calculator.description,
        path: '/tools/aspect-ratio-calculator',
        lang,
        keywords: dict.tools.aspect_ratio_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function AspectRatioCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AspectRatioCalculatorClient
                labels={{
                    title: dict.tools.aspect_ratio_calculator.title,
                    description: dict.tools.aspect_ratio_calculator.description,
                    width_label: dict.tools.aspect_ratio_calculator.width_label,
                    height_label: dict.tools.aspect_ratio_calculator.height_label,
                    ratio_label: dict.tools.aspect_ratio_calculator.ratio_label,
                    calculate: dict.tools.aspect_ratio_calculator.calculate,
                    result: dict.tools.aspect_ratio_calculator.result,
                    common_ratios: dict.tools.aspect_ratio_calculator.common_ratios,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.aspect_ratio_calculator.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.aspect_ratio_calculator.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.aspect_ratio_calculator} />
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.aspect_ratio_calculator.title}
                description={dict.tools.aspect_ratio_calculator.description}
                url={`https://cheetset.com/${lang}/tools/aspect-ratio-calculator`}
            />
        </div >
    );
}
