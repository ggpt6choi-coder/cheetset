import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import WifiQrCodeClient from './WifiQrCodeClient';
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
        title: `${dict.tools.wifi_qr_code.title} - ${dict.common.title}`,
        description: dict.tools.wifi_qr_code.description,
        openGraph: {
            title: `${dict.tools.wifi_qr_code.title} - ${dict.common.title}`,
            description: dict.tools.wifi_qr_code.description,
        },
    };
}

export default async function WifiQrCodePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <WifiQrCodeClient
                labels={{
                    title: dict.tools.wifi_qr_code.title,
                    description: dict.tools.wifi_qr_code.description,
                    label_ssid: dict.tools.wifi_qr_code.label_ssid,
                    label_password: dict.tools.wifi_qr_code.label_password,
                    label_encryption: dict.tools.wifi_qr_code.label_encryption,
                    label_hidden: dict.tools.wifi_qr_code.label_hidden,
                    label_generate: dict.tools.wifi_qr_code.label_generate,
                    label_print: dict.tools.wifi_qr_code.label_print,
                    error_ssid_required: dict.tools.wifi_qr_code.error_ssid_required,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-12 mb-20">
                <RichContentSection content={dict.tools.wifi_qr_code as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="wifi-qr-code"
                category="daily"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.wifi_qr_code.title}
                description={dict.tools.wifi_qr_code.description}
                url={`https://cheetset.com/${lang}/tools/wifi-qr-code`}
            />

        </div>
    );
}
