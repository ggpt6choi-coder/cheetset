import { getDictionary } from '@/dictionaries/get-dictionary';
import ImageCompressorClient from './ImageCompressorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import { Metadata } from 'next';

type Locale = 'en' | 'ko' | 'ja';
type Props = { params: Promise<{ lang: string }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.image_compressor.title} - ${dict.common.title}`,
        description: dict.tools.image_compressor.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-compressor`,
        },
    };
}

export default async function ImageCompressorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageCompressorClient
                labels={{
                    title: dict.tools.image_compressor.title,
                    description: dict.tools.image_compressor.description,
                    drop_zone: dict.tools.image_compressor.drop_zone,
                    drop_zone_sub: dict.tools.image_compressor.drop_zone_sub,
                    compressing: dict.tools.image_compressor.compressing,
                    download: dict.tools.image_compressor.download,
                    original_size: dict.tools.image_compressor.original_size,
                    compressed_size: dict.tools.image_compressor.compressed_size,
                    quality_label: dict.tools.image_compressor.quality_label,
                    max_width_label: dict.tools.image_compressor.max_width_label,
                    compress_button: dict.tools.image_compressor.compress_button,
                    reset_button: dict.tools.image_compressor.reset_button,
                    saved_label: dict.tools.image_compressor.saved_label,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">
                        {dict.tools.image_compressor.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools currentSlug="image-compressor" lang={lang} category="developer" />

            <ToolJsonLd
                name={dict.tools.image_compressor.title}
                description={dict.tools.image_compressor.description}
                url={`https://cheetset.com/${lang}/tools/image-compressor`}
            />
        </div>
    );
}
