import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import MyIpAddressClient from './MyIpAddressClient';
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
        title: `${dict.tools.my_ip_address.title} - ${dict.common.title}`,
        description: dict.tools.my_ip_address.description,
        openGraph: {
            title: `${dict.tools.my_ip_address.title} - ${dict.common.title}`,
            description: dict.tools.my_ip_address.description,
        },
    };
}

export default async function MyIpAddressPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MyIpAddressClient
                labels={{
                    title: dict.tools.my_ip_address.title,
                    description: dict.tools.my_ip_address.description,
                    label_ip: dict.tools.my_ip_address.label_ip,
                    label_location: dict.tools.my_ip_address.label_location,
                    label_os: dict.tools.my_ip_address.label_os,
                    label_browser: dict.tools.my_ip_address.label_browser,
                    label_device: dict.tools.my_ip_address.label_device,
                    label_screen: dict.tools.my_ip_address.label_screen,
                    label_copy: dict.tools.my_ip_address.label_copy,
                    label_copied: dict.tools.my_ip_address.label_copied,
                    privacy_notice: dict.tools.my_ip_address.privacy_notice,
                    error_fetch_ip: dict.tools.my_ip_address.error_fetch_ip,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-12 mb-20">
                <RichContentSection content={dict.tools.my_ip_address as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="my-ip-address"
                category="daily"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.my_ip_address.title}
                description={dict.tools.my_ip_address.description}
                url={`https://cheetset.com/${lang}/tools/my-ip-address`}
            />

        </div>
    );
}
