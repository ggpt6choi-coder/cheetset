import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import DiffCheckerClient from './DiffCheckerClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.diff_checker.title} - ${dict.common.title}`,
        description: dict.tools.diff_checker.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/diff-checker`,
        },
    };
}

export default async function DiffCheckerPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <DiffCheckerClient
                labels={{
                    title: dict.tools.diff_checker.title,
                    description: dict.tools.diff_checker.description,
                    original: dict.tools.diff_checker.original,
                    modified: dict.tools.diff_checker.modified,
                    compare: dict.tools.diff_checker.compare,
                    clear: dict.tools.diff_checker.clear,
                    legend_added: dict.tools.diff_checker.legend_added,
                    legend_removed: dict.tools.diff_checker.legend_removed,
                    no_diff: dict.tools.diff_checker.no_diff,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.diff_checker.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="diff-checker" category="developer" />

            <ToolJsonLd
                name={dict.tools.diff_checker.title}
                description={dict.tools.diff_checker.description}
                url={`https://cheetset.com/${lang}/tools/diff-checker`}
            />
        </div>
    );
}
