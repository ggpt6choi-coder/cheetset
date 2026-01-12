import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageFiltersClient from './ImageFiltersClient';
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
        title: dict.tools.image_filters.title,
        description: dict.tools.image_filters.description,
        path: '/tools/image-filters',
        lang,
        keywords: dict.tools.image_filters.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function ImageFiltersPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageFiltersClient
                labels={{
                    title: dict.tools.image_filters.title,
                    description: dict.tools.image_filters.description,
                    drop_zone: dict.tools.image_filters.drop_zone,
                    filters: dict.tools.image_filters.filters,
                    adjustments: dict.tools.image_filters.adjustments,
                    brightness: dict.tools.image_filters.brightness,
                    contrast: dict.tools.image_filters.contrast,
                    saturation: dict.tools.image_filters.saturation,
                    grayscale: dict.tools.image_filters.grayscale,
                    sepia: dict.tools.image_filters.sepia,
                    blur: dict.tools.image_filters.blur,
                    download: dict.tools.image_filters.download,
                    reset: dict.tools.image_filters.reset,
                }}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.image_filters as ToolContent} />

            <RelatedTools lang={lang} currentSlug="image-filters" category="image" />

            <ToolJsonLd
                name={dict.tools.image_filters.title}
                description={dict.tools.image_filters.description}
                url={`https://cheetset.com/${lang}/tools/image-filters`}
            />
        </div>
    );
}
