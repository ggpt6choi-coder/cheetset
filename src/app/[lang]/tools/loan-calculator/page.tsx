import { getDictionary } from '@/dictionaries/get-dictionary';
import LoanCalculatorClient from './LoanCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { Metadata } from 'next';

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.loan_calculator.title} - ${dict.common.title}`,
        description: dict.tools.loan_calculator.description,
    };
}

export default async function LoanCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <LoanCalculatorClient
                labels={{
                    title: dict.tools.loan_calculator.title,
                    description: dict.tools.loan_calculator.description,
                    amount_label: dict.tools.loan_calculator.amount_label,
                    rate_label: dict.tools.loan_calculator.rate_label,
                    period_label: dict.tools.loan_calculator.period_label,
                    period_unit: dict.tools.loan_calculator.period_unit,
                    type_label: dict.tools.loan_calculator.type_label,
                    type_equal_principal_interest: dict.tools.loan_calculator.type_equal_principal_interest,
                    type_equal_principal: dict.tools.loan_calculator.type_equal_principal,
                    type_maturity: dict.tools.loan_calculator.type_maturity,
                    calculate_button: dict.tools.loan_calculator.calculate_button,
                    monthly_payment: dict.tools.loan_calculator.monthly_payment,
                    total_interest: dict.tools.loan_calculator.total_interest,
                    total_payment: dict.tools.loan_calculator.total_payment,
                    chart_principal: dict.tools.loan_calculator.chart_principal,
                    chart_interest: dict.tools.loan_calculator.chart_interest,
                    schedule_title: dict.tools.loan_calculator.schedule_title,
                    col_month: dict.tools.loan_calculator.col_month,
                    col_payment: dict.tools.loan_calculator.col_payment,
                    col_principal: dict.tools.loan_calculator.col_principal,
                    col_interest: dict.tools.loan_calculator.col_interest,
                    col_balance: dict.tools.loan_calculator.col_balance,
                    download_schedule: dict.tools.loan_calculator.download_schedule,
                }}
                lang={lang}
            />

            <RichContentSection content={dict.tools.loan_calculator as ToolContent} />

            <RelatedTools currentSlug="loan-calculator" lang={lang} category="finance" />

            <ToolJsonLd
                name={dict.tools.loan_calculator.title}
                description={dict.tools.loan_calculator.description}
                url={`https://cheetset.com/${lang}/tools/loan-calculator`}
            />
        </div>
    );
}
