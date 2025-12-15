import { getDictionary } from '@/dictionaries/get-dictionary';
import ImageCompressorClient from './ImageCompressorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import { Metadata } from 'next';

type Locale = 'en' | 'ko' | 'ja';
type Props = { params: Promise<{ lang: string }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.image_compressor.title} - ${dict.common.title}`,
        description: dict.tools.image_compressor.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-compressor`,
        },
    };
}

export default async function ImageCompressorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageCompressorClient
                labels={{
                    title: dict.tools.image_compressor.title,
                    description: dict.tools.image_compressor.description,
                    drop_zone: dict.tools.image_compressor.drop_zone,
                    drop_zone_sub: dict.tools.image_compressor.drop_zone_sub,
                    compressing: dict.tools.image_compressor.compressing,
                    download: dict.tools.image_compressor.download,
                    original_size: dict.tools.image_compressor.original_size,
                    compressed_size: dict.tools.image_compressor.compressed_size,
                    quality_label: dict.tools.image_compressor.quality_label,
                    max_width_label: dict.tools.image_compressor.max_width_label,
                    compress_button: dict.tools.image_compressor.compress_button,
                    reset_button: dict.tools.image_compressor.reset_button,
                    saved_label: dict.tools.image_compressor.saved_label,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.image_compressor.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.image_compressor.seo_content}
                    </p>

                    <div className="space-y-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.image_compressor.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.image_compressor.how_to_step1}</li>
                                <li>{dict.tools.image_compressor.how_to_step2}</li>
                                <li>{dict.tools.image_compressor.how_to_step3}</li>
                                <li>{dict.tools.image_compressor.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.image_compressor.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.image_compressor.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.image_compressor.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.image_compressor.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.image_compressor.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.image_compressor.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.image_compressor.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.image_compressor.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.image_compressor.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentSlug="image-compressor" lang={lang} category="developer" />

            <ToolJsonLd
                name={dict.tools.image_compressor.title}
                description={dict.tools.image_compressor.description}
                url={`https://cheetset.com/${lang}/tools/image-compressor`}
            />
        </div>
    );
}
