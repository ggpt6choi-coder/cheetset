import { getDictionary } from '@/dictionaries/get-dictionary';
import ImageConverterClient from './ImageConverterClient';
import { Metadata } from 'next';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.image_converter.title} - ${dict.common.title}`,
        description: dict.tools.image_converter.seo_content,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-converter`,
        },
    };
}

export default async function ImageConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.image_converter.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.image_converter.description}
                    </p>
                </div>

                <ImageConverterClient dict={dict} />

                <div className="mt-12 prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        About this Tool
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {dict.tools.image_converter.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools
                currentSlug="image-converter"
                category="image"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.image_converter.title}
                description={dict.tools.image_converter.description}
                url={`https://cheetset.com/${lang}/tools/image-converter`}
            />
        </div>
    );
}
