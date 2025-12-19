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
                    table_title: dict.tools.bmi_calculator.table_title,
                    table_bmi: dict.tools.bmi_calculator.table_bmi,
                    table_status: dict.tools.bmi_calculator.table_status,
                    tip_title: dict.tools.bmi_calculator.tip_title,
                    tip_underweight: dict.tools.bmi_calculator.tip_underweight,
                    tip_normal: dict.tools.bmi_calculator.tip_normal,
                    tip_overweight: dict.tools.bmi_calculator.tip_overweight,
                    tip_obese: dict.tools.bmi_calculator.tip_obese,
                    tip_severe_obese: dict.tools.bmi_calculator.tip_severe_obese,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        {dict.tools.bmi_calculator.seo_content}
                    </p>

                    <div className="space-y-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.bmi_calculator.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.bmi_calculator.how_to_step1}</li>
                                <li>{dict.tools.bmi_calculator.how_to_step2}</li>
                                <li>{dict.tools.bmi_calculator.how_to_step3}</li>
                                <li>{dict.tools.bmi_calculator.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.bmi_calculator.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmi_calculator.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmi_calculator.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.bmi_calculator.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.bmi_calculator.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.bmi_calculator.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.bmi_calculator.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.bmi_calculator.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.bmi_calculator.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
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
