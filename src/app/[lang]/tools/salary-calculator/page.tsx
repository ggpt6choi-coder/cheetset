import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SalaryClient from './SalaryClient';
import RelatedTools from '@/components/tools/RelatedTools';

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

            <div className="max-w-3xl mx-auto mt-16 px-6">
                <div className="prose prose-indigo dark:prose-invert mx-auto">
                    <p>{dict.tools.salary_calculator.seo_content}</p>
                </div>
            </div>

            <RelatedTools
                currentSlug="salary-calculator"
                category="finance"
                lang={lang}
            />
        </div>
    );
}
