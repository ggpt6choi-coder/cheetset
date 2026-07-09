import { getDictionary } from '@/dictionaries/get-dictionary';
import BlackScholesClient from './BlackScholesClient';
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
        title: dict.tools.black_scholes.title,
        description: dict.tools.black_scholes.description,
        path: '/tools/black-scholes',
        lang,
        keywords: dict.tools.black_scholes.keywords || [],
    });
}

export default async function BlackScholesPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.black_scholes;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BlackScholesClient labels={{
                title: d.title, description: d.description, stock_price: d.stock_price,
                strike_price: d.strike_price, time_to_expiry: d.time_to_expiry,
                risk_free_rate: d.risk_free_rate, volatility: d.volatility,
                dividend_yield: d.dividend_yield, calculate: d.calculate,
                call_price: d.call_price, put_price: d.put_price, greeks_title: d.greeks_title,
                delta: d.delta, gamma: d.gamma, theta: d.theta, vega: d.vega, rho: d.rho,
                intrinsic_value: d.intrinsic_value, time_value: d.time_value,
                call_label: d.call_label, put_label: d.put_label, days_to_expiry: d.days_to_expiry,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="black-scholes" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/black-scholes`} />
        </div>
    );
}
