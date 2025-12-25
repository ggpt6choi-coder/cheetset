import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import StockAverageClient from './StockAverageClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.stock_average_calculator.title} - ${dict.common.title}`,
        description: dict.tools.stock_average_calculator.description,
    };
}

export default async function StockAveragePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <StockAverageClient
                labels={{
                    title: dict.tools.stock_average_calculator.title,
                    description: dict.tools.stock_average_calculator.description,
                    current_price: dict.tools.stock_average_calculator.current_price,
                    current_quantity: dict.tools.stock_average_calculator.current_quantity,
                    add_price: dict.tools.stock_average_calculator.add_price,
                    add_quantity: dict.tools.stock_average_calculator.add_quantity,
                    calculate: dict.tools.stock_average_calculator.calculate,
                    reset: dict.tools.stock_average_calculator.reset,
                    result_avg_price: dict.tools.stock_average_calculator.result_avg_price,
                    result_total_quantity: dict.tools.stock_average_calculator.result_total_quantity,
                    result_total_amount: dict.tools.stock_average_calculator.result_total_amount,
                }}
            />

            {/* SEO Content */}
            <RichContentSection content={dict.tools.stock_average_calculator as ToolContent} />

            <RelatedTools
                currentSlug="stock-average-calculator"
                category="finance"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.stock_average_calculator.title}
                description={dict.tools.stock_average_calculator.description}
                url={`https://cheetset.com/${lang}/tools/stock-average-calculator`}
            />
        </div>
    );
}
