import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import VatCalculatorClient from './VatCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
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
        title: dict.tools.vat_calculator.title,
        description: dict.tools.vat_calculator.description,
        path: '/tools/vat-calculator',
        lang,
        keywords: dict.tools.vat_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function VatCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <VatCalculatorClient
                labels={{
                    title: dict.tools.vat_calculator.title,
                    description: dict.tools.vat_calculator.description,
                    amount_label: dict.tools.vat_calculator.amount_label,
                    rate_label: dict.tools.vat_calculator.rate_label,
                    add_tax: dict.tools.vat_calculator.add_tax,
                    remove_tax: dict.tools.vat_calculator.remove_tax,
                    vat_amount: dict.tools.vat_calculator.vat_amount,
                    total_amount: dict.tools.vat_calculator.total_amount,
                    net_amount: dict.tools.vat_calculator.net_amount,
                }}
                lang={lang}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.vat_calculator as ToolContent} />

            <ToolJsonLd
                name={dict.tools.vat_calculator.title}
                description={dict.tools.vat_calculator.description}
                url={`https://www.cheetset.com/${lang}/tools/vat-calculator`}
            />
        </div>
    );
}
