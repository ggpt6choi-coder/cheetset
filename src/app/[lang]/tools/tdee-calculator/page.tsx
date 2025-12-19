import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import TdeeCalculatorClient from './TdeeCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.tdee_calculator.title} - ${dict.common.title}`,
        description: dict.tools.tdee_calculator.description,
    };
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
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2>{dict.tools.tdee_calculator.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.tdee_calculator.seo_content}
                    </p>

                    <div className="space-y-12 mb-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.tdee_calculator.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.tdee_calculator.how_to_step1}</li>
                                <li>{dict.tools.tdee_calculator.how_to_step2}</li>
                                <li>{dict.tools.tdee_calculator.how_to_step3}</li>
                                <li>{dict.tools.tdee_calculator.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.tdee_calculator.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.tdee_calculator.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.tdee_calculator.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.tdee_calculator.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.tdee_calculator.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.tdee_calculator.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.tdee_calculator.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.tdee_calculator.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.tdee_calculator.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                    <div className="not-prose mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
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
                url={`https://cheetset.com/${lang}/tools/tdee-calculator`}
            />
        </div>
    );
}
