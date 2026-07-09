import { getDictionary } from '@/dictionaries/get-dictionary';
import CagrCalculatorClient from './CagrCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { Metadata } from 'next';
import { constructMetadata } from '@/utils/seo';

type Locale = 'en' | 'ko' | 'ja';
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return constructMetadata({
        title: dict.tools.cagr_calculator.title,
        description: dict.tools.cagr_calculator.description,
        path: '/tools/cagr-calculator',
        lang,
        keywords: dict.tools.cagr_calculator.keywords || [],
    });
}

export default async function CagrCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.cagr_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CagrCalculatorClient labels={{
                title: d.title, description: d.description, mode: d.mode,
                mode_cagr: d.mode_cagr, mode_future: d.mode_future, mode_period: d.mode_period,
                initial_value: d.initial_value, final_value: d.final_value,
                period_years: d.period_years, cagr_rate: d.cagr_rate, calculate: d.calculate,
                result_cagr: d.result_cagr, result_future: d.result_future,
                result_period: d.result_period, result_total_return: d.result_total_return,
                result_total_gain: d.result_total_gain, chart_title: d.chart_title,
                year_label: d.year_label, value_label: d.value_label,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="cagr-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/cagr-calculator`} />
        </div>
    );
}
