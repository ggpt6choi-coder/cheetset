import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import TdeeCalculatorClient from './TdeeCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        title: dict.tools.tdee_calculator.title,
        description: dict.tools.tdee_calculator.description,
        path: '/tools/tdee-calculator',
        lang,
        keywords: dict.tools.tdee_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function TdeeCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <TdeeCalculatorClient
                labels={{
                    title: dict.tools.tdee_calculator.title,
                    description: dict.tools.tdee_calculator.description,
                    gender_label: dict.tools.tdee_calculator.gender_label,
                    male: dict.tools.tdee_calculator.male,
                    female: dict.tools.tdee_calculator.female,
                    age_label: dict.tools.tdee_calculator.age_label,
                    height_label: dict.tools.tdee_calculator.height_label,
                    weight_label: dict.tools.tdee_calculator.weight_label,
                    activity_label: dict.tools.tdee_calculator.activity_label,
                    activity_sedentary: dict.tools.tdee_calculator.activity_sedentary,
                    activity_light: dict.tools.tdee_calculator.activity_light,
                    activity_moderate: dict.tools.tdee_calculator.activity_moderate,
                    activity_active: dict.tools.tdee_calculator.activity_active,
                    activity_very_active: dict.tools.tdee_calculator.activity_very_active,
                    goal_label: dict.tools.tdee_calculator.goal_label,
                    goal_lose: dict.tools.tdee_calculator.goal_lose,
                    goal_maintain: dict.tools.tdee_calculator.goal_maintain,
                    goal_gain: dict.tools.tdee_calculator.goal_gain,
                    calculate_button: dict.tools.tdee_calculator.calculate_button,
                    result_tdee: dict.tools.tdee_calculator.result_tdee,
                    result_macros: dict.tools.tdee_calculator.result_macros,
                    macro_carbs: dict.tools.tdee_calculator.macro_carbs,
                    macro_protein: dict.tools.tdee_calculator.macro_protein,
                    macro_fat: dict.tools.tdee_calculator.macro_fat,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <RichContentSection content={dict.tools.tdee_calculator as ToolContent} />

                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mt-8">
                    <div className="not-prose p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            {lang === 'ko' ? '기초대사량도 궁금하신가요?' :
                                lang === 'ja' ? '基礎代謝量も知りたいですか？' :
                                    'Want to know your BMR?'}
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 mb-4">
                            {lang === 'ko' ? '아무것도 하지 않아도 소모되는 칼로리(BMR)를 확인해보세요.' :
                                lang === 'ja' ? '何もしなくても消費されるカロリー（BMR）を確認しましょう。' :
                                    'Check out how many calories you burn just by existing.'}
                        </p>
                        <Link
                            href={`/${lang}/tools/bmr-calculator`}
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                            {dict.tools.bmr_calculator.title}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.tdee_calculator.title}
                description={dict.tools.tdee_calculator.description}
                url={`https://www.cheetset.com/${lang}/tools/tdee-calculator`}
            />
        </div>
    );
}
