import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import PercentageCalculatorClient from './PercentageCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.percentage_calculator.title,
        description: dict.tools.percentage_calculator.description,
        path: '/tools/percentage-calculator',
        lang,
        keywords: dict.tools.percentage_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function PercentageCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <PercentageCalculatorClient
                labels={{
                    title: dict.tools.percentage_calculator.title,
                    description: dict.tools.percentage_calculator.description,
                    calc1_label: dict.tools.percentage_calculator.calc1_label,
                    calc1_desc: dict.tools.percentage_calculator.calc1_desc,
                    calc1_result: dict.tools.percentage_calculator.calc1_result,
                    calc2_label: dict.tools.percentage_calculator.calc2_label,
                    calc2_desc: dict.tools.percentage_calculator.calc2_desc,
                    calc2_result: dict.tools.percentage_calculator.calc2_result,
                    calc3_label: dict.tools.percentage_calculator.calc3_label,
                    calc3_desc: dict.tools.percentage_calculator.calc3_desc,
                    calc3_result: dict.tools.percentage_calculator.calc3_result,
                    calculate: dict.tools.percentage_calculator.calculate,
                    result: dict.tools.percentage_calculator.result,
                }}
            />

            {/* SEO Content */}
            <RichContentSection content={dict.tools.percentage_calculator as ToolContent} />

            <RelatedTools lang={lang} currentSlug="percentage-calculator" category="daily" />

            <ToolJsonLd
                name={dict.tools.percentage_calculator.title}
                description={dict.tools.percentage_calculator.description}
                url={`https://cheetset.com/${lang}/tools/percentage-calculator`}
            />
        </div>
    );
}
