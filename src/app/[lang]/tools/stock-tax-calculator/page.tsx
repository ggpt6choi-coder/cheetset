import { getDictionary } from '@/dictionaries/get-dictionary';
import StockTaxClient from './StockTaxClient';
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
        title: dict.tools.stock_tax_calculator.title,
        description: dict.tools.stock_tax_calculator.description,
        path: '/tools/stock-tax-calculator',
        lang,
        keywords: dict.tools.stock_tax_calculator.keywords || [],
    });
}

export default async function StockTaxPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.stock_tax_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <StockTaxClient labels={{
                title: d.title, description: d.description, add_trade: d.add_trade,
                stock_name: d.stock_name, buy_price: d.buy_price, sell_price: d.sell_price,
                quantity: d.quantity, profit_loss: d.profit_loss, remove: d.remove,
                total_profit: d.total_profit, total_loss: d.total_loss, net_gain: d.net_gain,
                basic_deduction: d.basic_deduction, taxable_income: d.taxable_income,
                tax_rate: d.tax_rate, total_tax: d.total_tax, local_tax: d.local_tax,
                no_tax: d.no_tax, tax_note: d.tax_note, currency: d.currency,
                exchange_rate: d.exchange_rate, calculate: d.calculate, reset: d.reset,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="stock-tax-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/stock-tax-calculator`} />
        </div>
    );
}
