import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import YoutubeThumbnailClient from './YoutubeThumbnailClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
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
        title: dict.tools.youtube_thumbnail.title,
        description: dict.tools.youtube_thumbnail.description,
        path: '/tools/youtube-thumbnail',
        lang,
        keywords: dict.tools.youtube_thumbnail.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function YoutubeThumbnailPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <YoutubeThumbnailClient
                labels={{
                    title: dict.tools.youtube_thumbnail.title,
                    description: dict.tools.youtube_thumbnail.description,
                    input_placeholder: dict.tools.youtube_thumbnail.input_placeholder,
                    extract_button: dict.tools.youtube_thumbnail.extract_button,
                    download_image: dict.tools.youtube_thumbnail.download_image,
                    quality_max: dict.tools.youtube_thumbnail.quality_max,
                    quality_high: dict.tools.youtube_thumbnail.quality_high,
                    quality_medium: dict.tools.youtube_thumbnail.quality_medium,
                    quality_standard: dict.tools.youtube_thumbnail.quality_standard,
                    error_invalid_url: dict.tools.youtube_thumbnail.error_invalid_url,
                }}
            />

            {/* SEO Content */}
            <div className="mt-12 mb-20">
                <RichContentSection content={dict.tools.youtube_thumbnail as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="youtube-thumbnail"
                category="image"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.youtube_thumbnail.title}
                description={dict.tools.youtube_thumbnail.description}
                url={`https://www.cheetset.com/${lang}/tools/youtube-thumbnail`}
            />

        </div>
    );
}
