import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import UUIDGeneratorClient from './UUIDGeneratorClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.uuid_generator.title,
        description: dict.tools.uuid_generator.description,
        path: '/tools/uuid-generator',
        lang,
        keywords: dict.tools.uuid_generator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function UUIDGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <UUIDGeneratorClient
                labels={{
                    title: dict.tools.uuid_generator.title,
                    description: dict.tools.uuid_generator.description,
                    subtitle: dict.tools.uuid_generator.subtitle,
                    generate: dict.tools.uuid_generator.generate,
                    copy: dict.tools.uuid_generator.copy,
                    copy_all: dict.tools.uuid_generator.copy_all,
                    quantity: dict.tools.uuid_generator.quantity,
                    copied: dict.tools.uuid_generator.copied,
                    all_copied: dict.tools.uuid_generator.all_copied,
                    clear: dict.tools.uuid_generator.clear,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.uuid_generator.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.uuid_generator.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.uuid_generator} />
                </div>
            </div>

            <RelatedTools
                currentSlug="uuid-generator"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.uuid_generator.title}
                description={dict.tools.uuid_generator.description}
                url={`https://cheetset.com/${lang}/tools/uuid-generator`}
            />
        </div>
    );
}
