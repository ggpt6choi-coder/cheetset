import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.nav.tools} - ${dict.common.title}`,
        description: dict.common.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools`,
        },
        openGraph: {
            title: `${dict.nav.tools} - ${dict.common.title}`,
            description: dict.common.description,
            url: `https://cheetset.com/${lang}/tools`,
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.nav.tools,
                },
            ],
        },
    };
}

export default async function ToolsPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const tools = [
        {
            slug: 'word-counter',
            title: dict.tools.word_counter.title,
            description: dict.tools.word_counter.description,
        },
        {
            slug: 'json-formatter',
            title: dict.tools.json_formatter.title,
            description: dict.tools.json_formatter.description,
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.nav.tools}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {dict.home.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <a
                        key={tool.slug}
                        href={`/${lang}/tools/${tool.slug}`}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {tool.title} &rarr;
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {tool.description}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
