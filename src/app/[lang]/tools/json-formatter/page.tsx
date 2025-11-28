import { getDictionary } from "@/dictionaries/get-dictionary";
import JsonFormatter from "@/components/JsonFormatter";
import type { Metadata } from "next";

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
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.tools.json_formatter.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {dict.tools.json_formatter.description}
                </p>
            </div>

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

            <div className="mt-16 max-w-3xl mx-auto prose dark:prose-invert">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        About this Tool
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {dict.tools.json_formatter.seo_content}
                    </p>
                </div>
            </div>
        </div>
    );
}
