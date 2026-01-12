import { getDictionary } from '@/dictionaries/get-dictionary';
import BmrCalculatorClient from './BmrCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import { Metadata } from 'next';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.bmr_calculator.title,
        description: dict.tools.bmr_calculator.description,
        path: '/tools/bmr-calculator',
        lang,
        keywords: dict.tools.bmr_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function BmrCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BmrCalculatorClient
                labels={{
                    title: dict.tools.bmr_calculator.title,
                    description: dict.tools.bmr_calculator.description,
                    gender_label: dict.tools.bmr_calculator.gender_label,
                    gender_male: dict.tools.bmr_calculator.gender_male,
                    gender_female: dict.tools.bmr_calculator.gender_female,
                    age_label: dict.tools.bmr_calculator.age_label,
                    height_label: dict.tools.bmr_calculator.height_label,
                    weight_label: dict.tools.bmr_calculator.weight_label,
                    activity_label: dict.tools.bmr_calculator.activity_label,
                    activity_sedentary: dict.tools.bmr_calculator.activity_sedentary,
                    activity_light: dict.tools.bmr_calculator.activity_light,
                    activity_moderate: dict.tools.bmr_calculator.activity_moderate,
                    activity_active: dict.tools.bmr_calculator.activity_active,
                    activity_very_active: dict.tools.bmr_calculator.activity_very_active,
                    calculate_button: dict.tools.bmr_calculator.calculate_button,
                    result_bmr: dict.tools.bmr_calculator.result_bmr,
                    result_tdee: dict.tools.bmr_calculator.result_tdee,
                    result_tdee_desc: dict.tools.bmr_calculator.result_tdee_desc,
                }}
            />

            <div className="max-w-4xl mx-auto px-4 pb-12">
                <RichContentSection content={dict.tools.bmr_calculator as ToolContent} />
            </div>

            <RelatedTools currentSlug="bmr-calculator" lang={lang} category="health" />

            <ToolJsonLd
                name={dict.tools.bmr_calculator.title}
                description={dict.tools.bmr_calculator.description}
                url={`https://cheetset.com/${lang}/tools/bmr-calculator`}
            />
        </div>
    );
}
