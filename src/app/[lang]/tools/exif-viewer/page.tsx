import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ExifViewerClient from './ExifViewerClient';
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
        title: `${dict.tools.exif_viewer.title} - ${dict.common.title}`,
        description: dict.tools.exif_viewer.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/exif-viewer`,
        },
    };
}

export default async function ExifViewerPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ExifViewerClient
                labels={{
                    title: dict.tools.exif_viewer.title,
                    description: dict.tools.exif_viewer.description,
                    drop_zone: dict.tools.exif_viewer.drop_zone,
                    drop_zone_sub: dict.tools.exif_viewer.drop_zone_sub,
                    no_data: dict.tools.exif_viewer.no_data,
                    processing: dict.tools.exif_viewer.processing,
                    basic_info: dict.tools.exif_viewer.basic_info,
                    camera_info: dict.tools.exif_viewer.camera_info,
                    settings_info: dict.tools.exif_viewer.settings_info,
                    gps_info: dict.tools.exif_viewer.gps_info,
                    file_name: dict.tools.exif_viewer.file_name,
                    file_size: dict.tools.exif_viewer.file_size,
                    dimensions: dict.tools.exif_viewer.dimensions,
                    mime_type: dict.tools.exif_viewer.mime_type,
                    make: dict.tools.exif_viewer.make,
                    model: dict.tools.exif_viewer.model,
                    lens: dict.tools.exif_viewer.lens,
                    date_taken: dict.tools.exif_viewer.date_taken,
                    exposure: dict.tools.exif_viewer.exposure,
                    aperture: dict.tools.exif_viewer.aperture,
                    iso: dict.tools.exif_viewer.iso,
                    focal_length: dict.tools.exif_viewer.focal_length,
                    flash: dict.tools.exif_viewer.flash,
                    latitude: dict.tools.exif_viewer.latitude,
                    longitude: dict.tools.exif_viewer.longitude,
                    view_on_map: dict.tools.exif_viewer.view_on_map,
                    reset: dict.tools.exif_viewer.reset,
                    remove_exif: dict.tools.exif_viewer.remove_exif,
                    privacy_note: dict.tools.exif_viewer.privacy_note,
                }}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.exif_viewer as ToolContent} />

            <RelatedTools lang={lang} currentSlug="exif-viewer" category="image" />

            <ToolJsonLd
                name={dict.tools.exif_viewer.title}
                description={dict.tools.exif_viewer.description}
                url={`https://cheetset.com/${lang}/tools/exif-viewer`}
            />
        </div>
    );
}
