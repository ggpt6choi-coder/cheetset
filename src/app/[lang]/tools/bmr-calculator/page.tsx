import { getDictionary } from '@/dictionaries/get-dictionary';
import BmrCalculatorClient from './BmrCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import { Metadata } from 'next';

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.bmr_calculator.title} - ${dict.common.title}`,
        description: dict.tools.bmr_calculator.description,
    };
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
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        {dict.tools.bmr_calculator.seo_content}
                    </p>

                    <div className="space-y-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.bmr_calculator.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.bmr_calculator.how_to_step1}</li>
                                <li>{dict.tools.bmr_calculator.how_to_step2}</li>
                                <li>{dict.tools.bmr_calculator.how_to_step3}</li>
                                <li>{dict.tools.bmr_calculator.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.bmr_calculator.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmr_calculator.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmr_calculator.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmr_calculator.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.bmr_calculator.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.bmr_calculator.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.bmr_calculator.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.bmr_calculator.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.bmr_calculator.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
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
