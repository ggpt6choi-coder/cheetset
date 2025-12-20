import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import MetaTagGeneratorClient from './MetaTagGeneratorClient';
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
        title: `${dict.tools.meta_tag_generator.title} - ${dict.common.title}`,
        description: dict.tools.meta_tag_generator.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/meta-tag-generator`,
        },
    };
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

                    <div className="space-y-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.meta_tag_generator.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.meta_tag_generator.how_to_step1}</li>
                                <li>{dict.tools.meta_tag_generator.how_to_step2}</li>
                                <li>{dict.tools.meta_tag_generator.how_to_step3}</li>
                                <li>{dict.tools.meta_tag_generator.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.meta_tag_generator.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.meta_tag_generator.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.meta_tag_generator.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.meta_tag_generator.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.meta_tag_generator.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.meta_tag_generator.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.meta_tag_generator.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.meta_tag_generator.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.meta_tag_generator.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="meta-tag-generator" category="developer" />

            <ToolJsonLd
                name={dict.tools.meta_tag_generator.title}
                description={dict.tools.meta_tag_generator.description}
                url={`https://cheetset.com/${lang}/tools/meta-tag-generator`}
            />
        </div>
    );
}
