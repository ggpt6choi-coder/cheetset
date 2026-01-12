import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import JsonDiffClient from './JsonDiffClient';
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
        title: dict.tools.json_diff.title,
        description: dict.tools.json_diff.description,
        path: '/tools/json-diff',
        lang,
        keywords: dict.tools.json_diff.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function JsonDiffPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <JsonDiffClient
                labels={{
                    title: dict.tools.json_diff.title,
                    description: dict.tools.json_diff.description,
                    original_label: dict.tools.json_diff.original_label,
                    modified_label: dict.tools.json_diff.modified_label,
                    compare_button: dict.tools.json_diff.compare_button,
                    result_label: dict.tools.json_diff.result_label,
                    error_invalid_json: dict.tools.json_diff.error_invalid_json,
                    no_diff: dict.tools.json_diff.no_diff,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2>{dict.tools.json_diff.title}</h2>
                    <p>{dict.tools.json_diff.seo_content}</p>

                    <div className="mt-12">
                        <RichContentSection content={dict.tools.json_diff} />
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.json_diff.title}
                description={dict.tools.json_diff.description}
                url={`https://cheetset.com/${lang}/tools/json-diff`}
            />
        </div>
    );
}
