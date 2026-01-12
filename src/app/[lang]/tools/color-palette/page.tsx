import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ColorPaletteClient from './ColorPaletteClient';
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
        title: dict.tools.color_palette.title,
        description: dict.tools.color_palette.description,
        path: '/tools/color-palette',
        lang,
        keywords: dict.tools.color_palette.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function ColorPalettePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ColorPaletteClient
                labels={{
                    title: dict.tools.color_palette.title,
                    description: dict.tools.color_palette.description,
                    upload_label: dict.tools.color_palette.upload_label,
                    palette_label: dict.tools.color_palette.palette_label,
                    copy_hex: dict.tools.color_palette.copy_hex,
                    copy_rgb: dict.tools.color_palette.copy_rgb,
                    copied: dict.tools.color_palette.copied,
                }}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.color_palette as ToolContent} />

            <ToolJsonLd
                name={dict.tools.color_palette.title}
                description={dict.tools.color_palette.description}
                url={`https://www.cheetset.com/${lang}/tools/color-palette`}
            />
        </div>
    );
}
