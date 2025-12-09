import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import AspectRatioCalculatorClient from './AspectRatioCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.aspect_ratio_calculator.title} - ${dict.common.title}`,
        description: dict.tools.aspect_ratio_calculator.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/aspect-ratio-calculator`,
        },
    };
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
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                        {dict.tools.aspect_ratio_calculator.seo_content}
                    </p>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.aspect_ratio_calculator.title}
                description={dict.tools.aspect_ratio_calculator.description}
                url={`https://cheetset.com/${lang}/tools/aspect-ratio-calculator`}
            />
        </div>
    );
}
