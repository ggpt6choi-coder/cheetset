import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import WifiQrCodeClient from './WifiQrCodeClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import FAQJsonLd from '@/components/FAQJsonLd';

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
                <article className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.wifi_qr_code.title}</h2>
                    <p>{dict.tools.wifi_qr_code.seo_content}</p>
                </article>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.wifi_qr_code.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.wifi_qr_code.how_to_step1}</li>
                        <li>{dict.tools.wifi_qr_code.how_to_step2}</li>
                        <li>{dict.tools.wifi_qr_code.how_to_step3}</li>
                        <li>{dict.tools.wifi_qr_code.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.wifi_qr_code.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.wifi_qr_code.faq_1_q}</h4>
                            <p>{dict.tools.wifi_qr_code.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.wifi_qr_code.faq_2_q}</h4>
                            <p>{dict.tools.wifi_qr_code.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.wifi_qr_code.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.wifi_qr_code.use_case_1}</li>
                        <li>{dict.tools.wifi_qr_code.use_case_2}</li>
                        <li>{dict.tools.wifi_qr_code.use_case_3}</li>
                    </ul>
                </section>
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
            <FAQJsonLd
                faqs={[
                    { question: dict.tools.wifi_qr_code.faq_1_q, answer: dict.tools.wifi_qr_code.faq_1_a },
                    { question: dict.tools.wifi_qr_code.faq_2_q, answer: dict.tools.wifi_qr_code.faq_2_a }
                ]}
            />
        </div>
    );
}
