import { getDictionary } from '@/dictionaries/get-dictionary';
import BondCalculatorClient from './BondCalculatorClient';
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
        title: dict.tools.bond_calculator.title,
        description: dict.tools.bond_calculator.description,
        path: '/tools/bond-calculator',
        lang,
        keywords: dict.tools.bond_calculator.keywords || [],
    });
}

export default async function BondCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.bond_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BondCalculatorClient labels={{
                title: d.title, description: d.description, face_value: d.face_value,
                coupon_rate: d.coupon_rate, maturity_years: d.maturity_years, market_rate: d.market_rate,
                coupon_frequency: d.coupon_frequency, freq_annual: d.freq_annual, freq_semi: d.freq_semi,
                freq_quarterly: d.freq_quarterly, calculate: d.calculate, bond_price: d.bond_price,
                ytm: d.ytm, duration: d.duration, modified_duration: d.modified_duration,
                cashflow_title: d.cashflow_title, col_period: d.col_period, col_coupon: d.col_coupon,
                col_principal: d.col_principal, col_total: d.col_total, col_pv: d.col_pv,
                discount_premium: d.discount_premium, at_par: d.at_par, at_discount: d.at_discount, at_premium: d.at_premium,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="bond-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/bond-calculator`} />
        </div>
    );
}
