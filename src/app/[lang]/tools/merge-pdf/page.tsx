import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import MergePdfClient from './MergePdfClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.merge_pdf.title,
        description: dict.tools.merge_pdf.description,
        path: '/tools/merge-pdf',
        lang,
        keywords: dict.tools.merge_pdf.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function MergePdfPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="pt-12 pb-12">
                <MergePdfClient
                    labels={{
                        title: dict.tools.merge_pdf.title,
                        description: dict.tools.merge_pdf.description,
                        drop_zone: dict.tools.merge_pdf.drop_zone,
                        merge: dict.tools.merge_pdf.merge,
                        download: dict.tools.merge_pdf.download,
                        reset: dict.tools.merge_pdf.reset,
                        file_count: dict.tools.merge_pdf.file_count,
                        drag_to_reorder: dict.tools.merge_pdf.drag_to_reorder,
                    }}
                />
            </div>

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.merge_pdf as ToolContent} />

            <RelatedTools lang={lang} currentSlug="merge-pdf" category="image" />

            <ToolJsonLd
                name={dict.tools.merge_pdf.title}
                description={dict.tools.merge_pdf.description}
                url={`https://www.cheetset.com/${lang}/tools/merge-pdf`}
            />
        </div>
    );
}
