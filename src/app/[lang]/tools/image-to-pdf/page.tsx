import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';
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
        title: dict.tools.image_to_pdf.title,
        description: dict.tools.image_to_pdf.description,
        path: '/tools/image-to-pdf',
        lang,
        keywords: dict.tools.image_to_pdf.keywords || [], // Fallback if keywords property is not guaranteed
    });
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
            {/* SEO Content */}
            <RichContentSection content={dict.tools.image_to_pdf as ToolContent} />

            <RelatedTools lang={lang} currentSlug="image-to-pdf" category="image" />

            <ToolJsonLd
                name={dict.tools.image_to_pdf.title}
                description={dict.tools.image_to_pdf.description}
                url={`https://cheetset.com/${lang}/tools/image-to-pdf`}
            />
        </div>
    );
}
