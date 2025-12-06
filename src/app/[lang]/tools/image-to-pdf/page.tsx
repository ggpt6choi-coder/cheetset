import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';
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
        title: `${dict.tools.image_to_pdf.title} - ${dict.common.title}`,
        description: dict.tools.image_to_pdf.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-to-pdf`,
        },
    };
}

export default async function ImageToPdfPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageToPdfClient
                labels={{
                    title: dict.tools.image_to_pdf.title,
                    description: dict.tools.image_to_pdf.description,
                    drop_zone: dict.tools.image_to_pdf.drop_zone,
                    convert: dict.tools.image_to_pdf.convert,
                    download: dict.tools.image_to_pdf.download,
                    reset: dict.tools.image_to_pdf.reset,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.image_to_pdf.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="image-to-pdf" category="image" />

            <ToolJsonLd
                name={dict.tools.image_to_pdf.title}
                description={dict.tools.image_to_pdf.description}
                url={`https://cheetset.com/${lang}/tools/image-to-pdf`}
            />
        </div>
    );
}
