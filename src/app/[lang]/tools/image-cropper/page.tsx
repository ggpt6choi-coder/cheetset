import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';
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
        title: `${dict.tools.image_cropper.title} - ${dict.common.title}`,
        description: dict.tools.image_cropper.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-cropper`,
        },
    };
}

export default async function ImageCropperPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageCropperClient
                labels={{
                    title: dict.tools.image_cropper.title,
                    description: dict.tools.image_cropper.description,
                    drop_zone: dict.tools.image_cropper.drop_zone,
                    zoom: dict.tools.image_cropper.zoom,
                    rotate: dict.tools.image_cropper.rotate,
                    aspect_ratio: dict.tools.image_cropper.aspect_ratio,
                    crop: dict.tools.image_cropper.crop,
                    download: dict.tools.image_cropper.download,
                    reset: dict.tools.image_cropper.reset,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.image_cropper.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="image-cropper" category="image" />

            <ToolJsonLd
                name={dict.tools.image_cropper.title}
                description={dict.tools.image_cropper.description}
                url={`https://cheetset.com/${lang}/tools/image-cropper`}
            />
        </div>
    );
}
