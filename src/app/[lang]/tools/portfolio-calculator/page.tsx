import { getDictionary } from '@/dictionaries/get-dictionary';
import PortfolioCalculatorClient from './PortfolioCalculatorClient';
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
        title: dict.tools.portfolio_calculator.title,
        description: dict.tools.portfolio_calculator.description,
        path: '/tools/portfolio-calculator',
        lang,
        keywords: dict.tools.portfolio_calculator.keywords || [],
    });
}

export default async function PortfolioCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const d = dict.tools.portfolio_calculator;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <PortfolioCalculatorClient labels={{
                title: d.title, description: d.description, add_stock: d.add_stock,
                stock_name: d.stock_name, buy_price: d.buy_price, current_price: d.current_price,
                quantity: d.quantity, weight: d.weight, return_pct: d.return_pct,
                profit_loss: d.profit_loss, total_invested: d.total_invested,
                total_value: d.total_value, total_profit: d.total_profit,
                weighted_return: d.weighted_return, remove: d.remove,
                chart_title: d.chart_title, no_stocks: d.no_stocks, calculate: d.calculate,
            }} />
            <RichContentSection content={d as ToolContent} />
            <RelatedTools currentSlug="portfolio-calculator" lang={lang} category="finance" />
            <ToolJsonLd name={d.title} description={d.description} url={`https://www.cheetset.com/${lang}/tools/portfolio-calculator`} />
        </div>
    );
}
