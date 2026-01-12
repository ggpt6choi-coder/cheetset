import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SqlFormatterClient from './SqlFormatterClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.sql_formatter.title,
        description: dict.tools.sql_formatter.description,
        path: '/tools/sql-formatter',
        lang,
        keywords: dict.tools.sql_formatter.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function SqlFormatterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SqlFormatterClient
                labels={{
                    title: dict.tools.sql_formatter.title,
                    description: dict.tools.sql_formatter.description,
                    placeholder: dict.tools.sql_formatter.placeholder,
                    format: dict.tools.sql_formatter.format,
                    copy: dict.tools.sql_formatter.copy,
                    clear: dict.tools.sql_formatter.clear,
                    copied: dict.tools.sql_formatter.copied,
                    dialect: dict.tools.sql_formatter.dialect,
                    tab_width: dict.tools.sql_formatter.tab_width,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.sql_formatter.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.sql_formatter.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.sql_formatter} />
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="sql-formatter" category="developer" />

            <ToolJsonLd
                name={dict.tools.sql_formatter.title}
                description={dict.tools.sql_formatter.description}
                url={`https://cheetset.com/${lang}/tools/sql-formatter`}
            />
        </div >
    );
}
