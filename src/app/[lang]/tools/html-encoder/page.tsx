import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import HtmlEncoderClient from './HtmlEncoderClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.html_encoder.title} - ${dict.common.title}`,
        description: dict.tools.html_encoder.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/html-encoder`,
        },
    };
}

export default async function HtmlEncoderPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <HtmlEncoderClient
                labels={{
                    title: dict.tools.html_encoder.title,
                    description: dict.tools.html_encoder.description,
                    input_placeholder: dict.tools.html_encoder.input_placeholder,
                    encode: dict.tools.html_encoder.encode,
                    decode: dict.tools.html_encoder.decode,
                    copy: dict.tools.html_encoder.copy,
                    copied: dict.tools.html_encoder.copied,
                    clear: dict.tools.html_encoder.clear,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.html_encoder.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="html-encoder" category="text" />

            <ToolJsonLd
                name={dict.tools.html_encoder.title}
                description={dict.tools.html_encoder.description}
                url={`https://cheetset.com/${lang}/tools/html-encoder`}
            />
        </div>
    );
}
