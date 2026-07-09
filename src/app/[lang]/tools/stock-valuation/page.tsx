import { getDictionary } from '@/dictionaries/get-dictionary';
import StockValuationClient from './StockValuationClient';
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
        title: dict.tools.stock_valuation.title,
        description: dict.tools.stock_valuation.description,
        path: '/tools/stock-valuation',
        lang,
        keywords: dict.tools.stock_valuation.keywords || [],
    });
}

export default async function StockValuationPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.stock_valuation;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <StockValuationClient labels={{
                title: d.title, description: d.description, current_price: d.current_price,
                per_section: d.per_section, eps: d.eps, target_per: d.target_per,
                pbr_section: d.pbr_section, bps: d.bps, target_pbr: d.target_pbr,
                ev_section: d.ev_section, ebitda_per_share: d.ebitda_per_share,
                net_debt_per_share: d.net_debt_per_share, target_ev_ebitda: d.target_ev_ebitda,
                calculate: d.calculate, fair_value_per: d.fair_value_per,
                fair_value_pbr: d.fair_value_pbr, fair_value_ev: d.fair_value_ev,
                average_fair_value: d.average_fair_value, upside: d.upside, downside: d.downside,
                current_per: d.current_per, current_pbr: d.current_pbr,
                overvalued: d.overvalued, undervalued: d.undervalued, fairly_valued: d.fairly_valued,
                disclaimer: d.disclaimer,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="stock-valuation" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/stock-valuation`} />
        </div>
    );
}
