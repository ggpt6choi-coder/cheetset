import { getDictionary } from "@/dictionaries/get-dictionary";
import JsonFormatter from "@/components/JsonFormatter";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.json_formatter.title} - ${dict.common.title}`,
        description: dict.tools.json_formatter.description,
        keywords: [dict.tools.json_formatter.title, 'json formatter', 'json validator', 'json minify', 'json beautify', 'online tool', 'free'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/json-formatter`,
        },
        openGraph: {
            title: `${dict.tools.json_formatter.title} - ${dict.common.title}`,
            description: dict.tools.json_formatter.description,
            url: `https://cheetset.com/${lang}/tools/json-formatter`,
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.tools.json_formatter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.tools.json_formatter.title} - ${dict.common.title}`,
            description: dict.tools.json_formatter.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function JsonFormatterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.json_formatter.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.json_formatter.description}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                    <JsonFormatter
                        labels={{
                            placeholder: dict.tools.json_formatter.placeholder,
                            format: dict.tools.json_formatter.format,
                            minify: dict.tools.json_formatter.minify,
                            copy: dict.tools.json_formatter.copy,
                            clear: dict.tools.json_formatter.clear,
                            error: dict.tools.json_formatter.error,
                            copied: dict.tools.json_formatter.copied
                        }}
                    />
                </div>

                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.json_formatter.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.json_formatter.seo_content}
                    </p>

                    <div className="space-y-12">
                        {/* How to Use */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                {dict.tools.json_formatter.how_to_title}
                            </h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                <li>{dict.tools.json_formatter.how_to_step1}</li>
                                <li>{dict.tools.json_formatter.how_to_step2}</li>
                                <li>{dict.tools.json_formatter.how_to_step3}</li>
                                <li>{dict.tools.json_formatter.how_to_step4}</li>
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                {dict.tools.json_formatter.use_cases_title}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.json_formatter.use_case_1}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.json_formatter.use_case_2}
                                </li>
                                <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                    {dict.tools.json_formatter.use_case_3}
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                {dict.tools.json_formatter.faq_title}
                            </h3>
                            <div className="space-y-4">
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.json_formatter.faq_1_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.json_formatter.faq_1_a}
                                    </div>
                                </details>
                                <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {dict.tools.json_formatter.faq_2_q}
                                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {dict.tools.json_formatter.faq_2_a}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools
                currentSlug="json-formatter"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.json_formatter.title}
                description={dict.tools.json_formatter.description}
                url={`https://cheetset.com/${lang}/tools/json-formatter`}
            />
        </div>
    );
}
