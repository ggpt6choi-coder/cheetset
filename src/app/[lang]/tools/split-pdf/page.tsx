import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import SplitPdfClient from './SplitPdfClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.split_pdf.title} - ${dict.common.title}`,
        description: dict.tools.split_pdf.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/split-pdf`,
        },
        openGraph: {
            title: `${dict.tools.split_pdf.title} - ${dict.common.title}`,
            description: dict.tools.split_pdf.description,
            url: `https://cheetset.com/${lang}/tools/split-pdf`,
        },
    };
}

export default async function SplitPdfPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="pt-12 pb-12">
                <SplitPdfClient
                    labels={{
                        title: dict.tools.split_pdf.title,
                        description: dict.tools.split_pdf.description,
                        drop_zone: dict.tools.split_pdf.drop_zone,
                        split: dict.tools.split_pdf.split,
                        download: dict.tools.split_pdf.download,
                        reset: dict.tools.split_pdf.reset,
                        page_range: dict.tools.split_pdf.page_range,
                        extract_all: dict.tools.split_pdf.extract_all,
                        extract_custom: dict.tools.split_pdf.extract_custom,
                        total_pages: dict.tools.split_pdf.total_pages,
                    }}
                />
            </div>

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
                    <p className="whitespace-pre-line">{dict.tools.split_pdf.seo_content}</p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="split-pdf" category="image" />

            <ToolJsonLd
                name={dict.tools.split_pdf.title}
                description={dict.tools.split_pdf.description}
                url={`https://cheetset.com/${lang}/tools/split-pdf`}
            />
        </div>
    );
}
