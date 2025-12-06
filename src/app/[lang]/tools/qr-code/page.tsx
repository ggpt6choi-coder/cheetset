import { getDictionary } from '@/dictionaries/get-dictionary';
import QrCodeGeneratorClient from '@/components/tools/QrCodeGeneratorClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as any);

    return {
        title: `${dict.tools.qr_code.title} - ${dict.common.title}`,
        description: dict.tools.qr_code.seo_content,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/qr-code`,
        },
    };
}

export default async function QrCodeGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as any);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <QrCodeGeneratorClient labels={dict.tools.qr_code} />

                <div className="mt-16">
                    <RelatedTools lang={lang} currentSlug="qr-code" category="daily" />
                </div>
                <ToolJsonLd
                    name={dict.tools.qr_code.title}
                    description={dict.tools.qr_code.description}
                    url={`https://cheetset.com/${lang}/tools/qr-code`}
                />
            </div>
        </div>
    );
}
