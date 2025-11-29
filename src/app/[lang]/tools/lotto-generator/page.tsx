import { getDictionary } from "@/dictionaries/get-dictionary";
import LottoGenerator from "@/components/LottoGenerator";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.lotto_generator.title} - ${dict.common.title}`,
        description: dict.tools.lotto_generator.description,
        keywords: [dict.tools.lotto_generator.title, 'lotto', 'lottery', 'random number', 'generator', 'lucky numbers'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/lotto-generator`,
        },
        openGraph: {
            title: `${dict.tools.lotto_generator.title} - ${dict.common.title}`,
            description: dict.tools.lotto_generator.description,
            url: `https://cheetset.com/${lang}/tools/lotto-generator`,
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.tools.lotto_generator.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.tools.lotto_generator.title} - ${dict.common.title}`,
            description: dict.tools.lotto_generator.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function LottoGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.tools.lotto_generator.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {dict.tools.lotto_generator.description}
                </p>
            </div>

            <LottoGenerator
                labels={{
                    generate: dict.tools.lotto_generator.generate,
                    save: dict.tools.lotto_generator.save,
                    saved_numbers: dict.tools.lotto_generator.saved_numbers,
                    no_saved: dict.tools.lotto_generator.no_saved,
                }}
            />

            <div className="mt-16 max-w-3xl mx-auto prose dark:prose-invert">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        About this Tool
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {dict.tools.lotto_generator.seo_content}
                    </p>
                </div>
            </div>
        </div>
    );
}
