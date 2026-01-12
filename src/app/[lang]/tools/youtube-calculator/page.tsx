import { getDictionary } from "@/dictionaries/get-dictionary";
import YoutubeCalculatorClient from "@/components/tools/YoutubeCalculatorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.youtube_calculator.title,
        description: dict.tools.youtube_calculator.description,
        path: '/tools/youtube-calculator',
        lang,
        keywords: dict.tools.youtube_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function YoutubeCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.youtube_calculator.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.youtube_calculator.description}
                    </p>
                </div>

                <YoutubeCalculatorClient
                    labels={{
                        title: dict.tools.youtube_calculator.title,
                        description: dict.tools.youtube_calculator.description,
                        daily_views: dict.tools.youtube_calculator.daily_views,
                        rpm: dict.tools.youtube_calculator.rpm,
                        estimated_earnings: dict.tools.youtube_calculator.estimated_earnings,
                        daily: dict.tools.youtube_calculator.daily,
                        monthly: dict.tools.youtube_calculator.monthly,
                        yearly: dict.tools.youtube_calculator.yearly,
                        disclaimer: dict.tools.youtube_calculator.disclaimer,
                    }}
                    lang={lang}
                />

                <RichContentSection content={dict.tools.youtube_calculator as ToolContent} />

                <RelatedTools
                    currentSlug="youtube-calculator"
                    category="finance"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.youtube_calculator.title}
                    description={dict.tools.youtube_calculator.description}
                    url={`https://www.cheetset.com/${lang}/tools/youtube-calculator`}
                />
            </div>
        </div>
    );
}
