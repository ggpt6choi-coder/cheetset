import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageResizerClient from './ImageResizerClient';
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
        title: dict.tools.image_resizer.title,
        description: dict.tools.image_resizer.description,
        path: '/tools/image-resizer',
        lang,
        keywords: dict.tools.image_resizer.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function ImageResizerPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageResizerClient
                labels={{
                    title: dict.tools.image_resizer.title,
                    description: dict.tools.image_resizer.description,
                    drop_zone: dict.tools.image_resizer.drop_zone,
                    width: dict.tools.image_resizer.width,
                    height: dict.tools.image_resizer.height,
                    format: dict.tools.image_resizer.format,
                    quality: dict.tools.image_resizer.quality,
                    maintain_aspect_ratio: dict.tools.image_resizer.maintain_aspect_ratio,
                    convert: dict.tools.image_resizer.convert,
                    download: dict.tools.image_resizer.download,
                    reset: dict.tools.image_resizer.reset,
                }}
            />

            {/* SEO Content */}

            <div className="pb-12">
                <RichContentSection content={dict.tools.image_resizer as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="image-resizer" category="daily" />

            <ToolJsonLd
                name={dict.tools.image_resizer.title}
                description={dict.tools.image_resizer.description}
                url={`https://www.cheetset.com/${lang}/tools/image-resizer`}
            />
        </div>
    );
}
