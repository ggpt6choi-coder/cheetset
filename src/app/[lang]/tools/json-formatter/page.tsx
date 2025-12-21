import { getDictionary } from "@/dictionaries/get-dictionary";
import JsonFormatter from "@/components/JsonFormatter";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';

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
                        <div className="space-y-12">
                            <RichContentSection content={dict.tools.json_formatter as ToolContent} />
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
