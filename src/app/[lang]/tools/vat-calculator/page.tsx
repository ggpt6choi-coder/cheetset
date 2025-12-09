import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import VatCalculatorClient from './VatCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.vat_calculator.title} - ${dict.common.title}`,
        description: dict.tools.vat_calculator.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/vat-calculator`,
        },
    };
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
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                        {dict.tools.vat_calculator.seo_content}
                    </p>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.vat_calculator.title}
                description={dict.tools.vat_calculator.description}
                url={`https://cheetset.com/${lang}/tools/vat-calculator`}
            />
        </div>
    );
}
