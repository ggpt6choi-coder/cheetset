import { getDictionary } from '@/dictionaries/get-dictionary';
import FxCalculatorClient from './FxCalculatorClient';
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
        title: dict.tools.fx_calculator.title,
        description: dict.tools.fx_calculator.description,
        path: '/tools/fx-calculator',
        lang,
        keywords: dict.tools.fx_calculator.keywords || [],
    });
}

export default async function FxCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.fx_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <FxCalculatorClient labels={{
                title: d.title, description: d.description, from_currency: d.from_currency,
                to_currency: d.to_currency, amount: d.amount, base_rate: d.base_rate,
                discount_rate: d.discount_rate, spread_rate: d.spread_rate, calculate: d.calculate,
                result_title: d.result_title, receive_amount: d.receive_amount,
                applied_rate: d.applied_rate, fee_amount: d.fee_amount, net_rate: d.net_rate,
                rate_guide: d.rate_guide, swap: d.swap, reset: d.reset,
                currencies: d.currencies,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="fx-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/fx-calculator`} />
        </div>
    );
}
