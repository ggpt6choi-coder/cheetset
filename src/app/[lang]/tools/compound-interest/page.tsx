import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CompoundInterestClient from './CompoundInterestClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import FAQJsonLd from '@/components/FAQJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.compound_interest.title,
        description: dict.tools.compound_interest.description,
        path: '/tools/compound-interest',
        lang,
        keywords: dict.tools.compound_interest.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function CompoundInterestPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CompoundInterestClient
                lang={lang}
                labels={{
                    title: dict.tools.compound_interest.title,
                    description: dict.tools.compound_interest.description,
                    subtitle: dict.tools.compound_interest.subtitle,
                    input_principal: dict.tools.compound_interest.input_principal,
                    input_monthly: dict.tools.compound_interest.input_monthly,
                    input_rate: dict.tools.compound_interest.input_rate,
                    input_years: dict.tools.compound_interest.input_years,
                    result_final: dict.tools.compound_interest.result_final,
                    result_principal: dict.tools.compound_interest.result_principal,
                    result_interest: dict.tools.compound_interest.result_interest,
                    chart_principal: dict.tools.compound_interest.chart_principal,
                    chart_interest: dict.tools.compound_interest.chart_interest,
                    table_year: dict.tools.compound_interest.table_year,
                    table_total: dict.tools.compound_interest.table_total,
                    table_interest: dict.tools.compound_interest.table_interest,
                }}
            />

            {/* SEO Content */}
            <RichContentSection content={dict.tools.compound_interest as ToolContent} />

            <RelatedTools
                currentSlug="compound-interest"
                category="finance"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.compound_interest.title}
                description={dict.tools.compound_interest.description}
                url={`https://www.cheetset.com/${lang}/tools/compound-interest`}
            />
            <FAQJsonLd
                faqs={(dict.tools.compound_interest as unknown as ToolContent).faq || []}
            />
        </div>
    );
}
