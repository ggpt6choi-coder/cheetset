import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import UrlEncoderClient from './UrlEncoderClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
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
        title: dict.tools.url_encoder.title,
        description: dict.tools.url_encoder.description,
        path: '/tools/url-encoder',
        lang,
        keywords: dict.tools.url_encoder.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function UrlEncoderPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <UrlEncoderClient
                labels={{
                    title: dict.tools.url_encoder.title,
                    description: dict.tools.url_encoder.description,
                    input_label: dict.tools.url_encoder.input_label,
                    output_label: dict.tools.url_encoder.output_label,
                    encode: dict.tools.url_encoder.encode,
                    decode: dict.tools.url_encoder.decode,
                    copy: dict.tools.url_encoder.copy,
                    copied: dict.tools.url_encoder.copied,
                    clear: dict.tools.url_encoder.clear,
                    placeholder: dict.tools.url_encoder.placeholder,
                }}
            />

            {/* SEO Content & Extra Sections */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">{dict.tools.url_encoder.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.url_encoder.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.url_encoder} />
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="url-encoder" category="developer" />

            <ToolJsonLd
                name={dict.tools.url_encoder.title}
                description={dict.tools.url_encoder.description}
                url={`https://cheetset.com/${lang}/tools/url-encoder`}
            />
        </div>
    );
}
