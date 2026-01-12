import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import MetaTagGeneratorClient from './MetaTagGeneratorClient';
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
        title: dict.tools.meta_tag_generator.title,
        description: dict.tools.meta_tag_generator.description,
        path: '/tools/meta-tag-generator',
        lang,
        keywords: dict.tools.meta_tag_generator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function MetaTagGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MetaTagGeneratorClient
                labels={{
                    title: dict.tools.meta_tag_generator.title,
                    description: dict.tools.meta_tag_generator.description,
                    input_section: dict.tools.meta_tag_generator.input_section,
                    preview_section: dict.tools.meta_tag_generator.preview_section,
                    code_section: dict.tools.meta_tag_generator.code_section,
                    site_title: dict.tools.meta_tag_generator.site_title,
                    site_description: dict.tools.meta_tag_generator.site_description,
                    site_url: dict.tools.meta_tag_generator.site_url,
                    image_url: dict.tools.meta_tag_generator.image_url,
                    google_preview: dict.tools.meta_tag_generator.google_preview,
                    facebook_preview: dict.tools.meta_tag_generator.facebook_preview,
                    copy_code: dict.tools.meta_tag_generator.copy_code,
                    copied: dict.tools.meta_tag_generator.copied,
                }}
            />

            {/* SEO Content & Extra Sections */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">{dict.tools.meta_tag_generator.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.meta_tag_generator.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.meta_tag_generator} />
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="meta-tag-generator" category="developer" />

            <ToolJsonLd
                name={dict.tools.meta_tag_generator.title}
                description={dict.tools.meta_tag_generator.description}
                url={`https://www.cheetset.com/${lang}/tools/meta-tag-generator`}
            />
        </div>
    );
}
