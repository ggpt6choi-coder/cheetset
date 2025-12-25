import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageBlurClient from './ImageBlurClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';

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
        title: `${dict.tools.image_blur.title} - ${dict.common.title}`,
        description: dict.tools.image_blur.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-blur`,
        },
    };
}

export default async function ImageBlurPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageBlurClient
                labels={{
                    title: dict.tools.image_blur.title,
                    description: dict.tools.image_blur.description,
                    drop_zone: dict.tools.image_blur.drop_zone,
                    blur_intensity: dict.tools.image_blur.blur_intensity,
                    mosaic_size: dict.tools.image_blur.mosaic_size,
                    mode: dict.tools.image_blur.mode,
                    mode_blur: dict.tools.image_blur.mode_blur,
                    mode_mosaic: dict.tools.image_blur.mode_mosaic,
                    clear_selection: dict.tools.image_blur.clear_selection,
                    apply: dict.tools.image_blur.apply,
                    download: dict.tools.image_blur.download,
                    reset: dict.tools.image_blur.reset,
                }}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.image_blur as ToolContent} />

            <RelatedTools lang={lang} currentSlug="image-blur" category="image" />

            <ToolJsonLd
                name={dict.tools.image_blur.title}
                description={dict.tools.image_blur.description}
                url={`https://cheetset.com/${lang}/tools/image-blur`}
            />
        </div>
    );
}
