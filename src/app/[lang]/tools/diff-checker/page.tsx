import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import DiffCheckerClient from './DiffCheckerClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
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
        title: dict.tools.diff_checker.title,
        description: dict.tools.diff_checker.description,
        path: '/tools/diff-checker',
        lang,
        keywords: dict.tools.diff_checker.keywords || [], // Fallback if keywords property is not guaranteed
    });
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
                <RichContentSection content={dict.tools.diff_checker as ToolContent} />
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
