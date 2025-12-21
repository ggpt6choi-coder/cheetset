import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SalaryClient from './SalaryClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.salary_calculator.title} - ${dict.common.title}`,
        description: dict.tools.salary_calculator.description,
    };
}

export default async function SalaryPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <SalaryClient
                lang={lang as Locale}
                labels={{
                    title: dict.tools.salary_calculator.title,
                    description: dict.tools.salary_calculator.description,
                    salary_input: dict.tools.salary_calculator.salary_input,
                    calculate: dict.tools.salary_calculator.calculate,
                    monthly_salary: dict.tools.salary_calculator.monthly_salary,
                    deductions: dict.tools.salary_calculator.deductions,
                    national_pension: dict.tools.salary_calculator.national_pension,
                    health_insurance: dict.tools.salary_calculator.health_insurance,
                    care_insurance: dict.tools.salary_calculator.care_insurance,
                    employment_insurance: dict.tools.salary_calculator.employment_insurance,
                    income_tax: dict.tools.salary_calculator.income_tax,
                }}
            />

            <div className="max-w-3xl mx-auto mt-16 px-6 pb-20 space-y-12">
                <div className="prose prose-indigo dark:prose-invert mx-auto">
                    <p className="lead">{dict.tools.salary_calculator.seo_content}</p>
                </div>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.salary_calculator.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.salary_calculator.how_to_step1}</li>
                        <li>{dict.tools.salary_calculator.how_to_step2}</li>
                        <li>{dict.tools.salary_calculator.how_to_step3}</li>
                        <li>{dict.tools.salary_calculator.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.salary_calculator.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.salary_calculator.faq_1_q}</h4>
                            <p>{dict.tools.salary_calculator.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.salary_calculator.faq_2_q}</h4>
                            <p>{dict.tools.salary_calculator.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.salary_calculator.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.salary_calculator.use_case_1}</li>
                        <li>{dict.tools.salary_calculator.use_case_2}</li>
                        <li>{dict.tools.salary_calculator.use_case_3}</li>
                    </ul>
                </section>
            </div>

            <RelatedTools
                currentSlug="salary-calculator"
                category="finance"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.salary_calculator.title}
                description={dict.tools.salary_calculator.description}
                url={`https://cheetset.com/${lang}/tools/salary-calculator`}
            />
        </div>
    );
}
