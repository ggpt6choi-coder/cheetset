import { getDictionary } from '@/dictionaries/get-dictionary';
import MarginCalculatorClient from './MarginCalculatorClient';
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
        title: dict.tools.margin_calculator.title,
        description: dict.tools.margin_calculator.description,
        path: '/tools/margin-calculator',
        lang,
        keywords: dict.tools.margin_calculator.keywords || [],
    });
}

export default async function MarginCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.margin_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MarginCalculatorClient labels={{
                title: d.title, description: d.description, instrument_type: d.instrument_type,
                type_futures: d.type_futures, type_options: d.type_options, type_crypto: d.type_crypto,
                underlying_price: d.underlying_price, contract_size: d.contract_size,
                num_contracts: d.num_contracts, margin_rate: d.margin_rate,
                position_type: d.position_type, long: d.long, short: d.short, calculate: d.calculate,
                total_exposure: d.total_exposure, required_margin: d.required_margin,
                leverage: d.leverage, liquidation_price: d.liquidation_price,
                profit_per_tick: d.profit_per_tick, tick_size: d.tick_size, warning: d.warning,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="margin-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/margin-calculator`} />
        </div>
    );
}
