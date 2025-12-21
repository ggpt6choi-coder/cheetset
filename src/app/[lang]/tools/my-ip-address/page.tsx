import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import MyIpAddressClient from './MyIpAddressClient';
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
                <article className="prose prose-blue dark:prose-invert mx-auto">
                    <h2>{dict.tools.my_ip_address.title}</h2>
                    <p>{dict.tools.my_ip_address.seo_content}</p>
                </article>

                {/* How-to Guide */}
                <section className="prose prose-blue dark:prose-invert mx-auto">
                    <h3>{dict.tools.my_ip_address.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.my_ip_address.how_to_step1}</li>
                        <li>{dict.tools.my_ip_address.how_to_step2}</li>
                        <li>{dict.tools.my_ip_address.how_to_step3}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-blue dark:prose-invert mx-auto">
                    <h3>{dict.tools.my_ip_address.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.my_ip_address.faq_1_q}</h4>
                            <p>{dict.tools.my_ip_address.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.my_ip_address.faq_2_q}</h4>
                            <p>{dict.tools.my_ip_address.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-blue dark:prose-invert mx-auto">
                    <h3>{dict.tools.my_ip_address.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.my_ip_address.use_case_1}</li>
                        <li>{dict.tools.my_ip_address.use_case_2}</li>
                        <li>{dict.tools.my_ip_address.use_case_3}</li>
                    </ul>
                </section>
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
            <FAQJsonLd
                faqs={[
                    { question: dict.tools.my_ip_address.faq_1_q, answer: dict.tools.my_ip_address.faq_1_a },
                    { question: dict.tools.my_ip_address.faq_2_q, answer: dict.tools.my_ip_address.faq_2_a }
                ]}
            />
        </div>
    );
}
