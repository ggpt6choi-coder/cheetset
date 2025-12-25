import { getDictionary } from "@/dictionaries/get-dictionary";
import RoiCalculatorClient from "@/components/tools/RoiCalculatorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.roi_calculator.title} - ${dict.common.title}`,
        description: dict.tools.roi_calculator.description,
        keywords: ['ROI calculator', 'return on investment', 'investment calculator', 'CAGR calculator', 'ROI 계산기', '투자 수익률', 'ROI計算機'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/roi-calculator`,
        },
        openGraph: {
            title: `${dict.tools.roi_calculator.title} - ${dict.common.title}`,
            description: dict.tools.roi_calculator.description,
            url: `https://cheetset.com/${lang}/tools/roi-calculator`,
            type: 'website',
        },
    };
}

export default async function RoiCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.roi_calculator.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.roi_calculator.description}
                    </p>
                </div>

                <RoiCalculatorClient
                    labels={{
                        title: dict.tools.roi_calculator.title,
                        description: dict.tools.roi_calculator.description,
                        invested_amount: dict.tools.roi_calculator.invested_amount,
                        amount_returned: dict.tools.roi_calculator.amount_returned,
                        investment_duration: dict.tools.roi_calculator.investment_duration,
                        calculate: dict.tools.roi_calculator.calculate,
                        roi_result: dict.tools.roi_calculator.roi_result,
                        annualized_roi: dict.tools.roi_calculator.annualized_roi,
                        total_profit: dict.tools.roi_calculator.total_profit,
                        years: dict.tools.roi_calculator.years,
                        months: dict.tools.roi_calculator.months,
                        days: dict.tools.roi_calculator.days,
                        invested: dict.tools.roi_calculator.invested_amount,
                        returned: dict.tools.roi_calculator.amount_returned,
                    }}
                    lang={lang}
                />

                <RichContentSection content={dict.tools.roi_calculator as ToolContent} />

                <RelatedTools
                    currentSlug="roi-calculator"
                    category="finance"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.roi_calculator.title}
                    description={dict.tools.roi_calculator.description}
                    url={`https://cheetset.com/${lang}/tools/roi-calculator`}
                />
            </div>
        </div>
    );
}
