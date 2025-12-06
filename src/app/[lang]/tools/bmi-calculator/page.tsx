import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import BmiCalculatorClient from './BmiCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.bmi_calculator.title} - ${dict.common.title}`,
        description: dict.tools.bmi_calculator.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/bmi-calculator`,
        },
    };
}

export default async function BmiCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BmiCalculatorClient
                labels={{
                    title: dict.tools.bmi_calculator.title,
                    description: dict.tools.bmi_calculator.description,
                    height: dict.tools.bmi_calculator.height,
                    weight: dict.tools.bmi_calculator.weight,
                    calculate: dict.tools.bmi_calculator.calculate,
                    result: dict.tools.bmi_calculator.result,
                    bmi_score: dict.tools.bmi_calculator.bmi_score,
                    status: dict.tools.bmi_calculator.status,
                    status_underweight: dict.tools.bmi_calculator.status_underweight,
                    status_normal: dict.tools.bmi_calculator.status_normal,
                    status_overweight: dict.tools.bmi_calculator.status_overweight,
                    status_obese: dict.tools.bmi_calculator.status_obese,
                    status_severe_obese: dict.tools.bmi_calculator.status_severe_obese,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.bmi_calculator.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="bmi-calculator" category="daily" />

            <ToolJsonLd
                name={dict.tools.bmi_calculator.title}
                description={dict.tools.bmi_calculator.description}
                url={`https://cheetset.com/${lang}/tools/bmi-calculator`}
            />
        </div>
    );
}
