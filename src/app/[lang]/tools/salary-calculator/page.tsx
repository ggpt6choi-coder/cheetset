import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SalaryClient from './SalaryClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
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
        title: dict.tools.salary_calculator.title,
        description: dict.tools.salary_calculator.description,
        path: '/tools/salary-calculator',
        lang,
        keywords: dict.tools.salary_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
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

            {/* SEO Content */}
            <RichContentSection content={dict.tools.salary_calculator as ToolContent} />

            <RelatedTools
                currentSlug="salary-calculator"
                category="finance"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.salary_calculator.title}
                description={dict.tools.salary_calculator.description}
                url={`https://www.cheetset.com/${lang}/tools/salary-calculator`}
            />
        </div>
    );
}
