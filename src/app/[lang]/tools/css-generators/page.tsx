import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CssGeneratorsClient from './CssGeneratorsClient';
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
        title: dict.tools.css_generators.title,
        description: dict.tools.css_generators.description,
        path: '/tools/css-generators',
        lang,
        keywords: dict.tools.css_generators.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function CssGeneratorsPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CssGeneratorsClient
                labels={{
                    title: dict.tools.css_generators.title,
                    description: dict.tools.css_generators.description,
                    tab_shadow: dict.tools.css_generators.tab_shadow,
                    tab_gradient: dict.tools.css_generators.tab_gradient,
                    tab_glass: dict.tools.css_generators.tab_glass,
                    shadow_opt_shift_right: dict.tools.css_generators.shadow_opt_shift_right,
                    shadow_opt_shift_down: dict.tools.css_generators.shadow_opt_shift_down,
                    shadow_opt_blur: dict.tools.css_generators.shadow_opt_blur,
                    shadow_opt_spread: dict.tools.css_generators.shadow_opt_spread,
                    shadow_opt_opacity: dict.tools.css_generators.shadow_opt_opacity,
                    gradient_type: dict.tools.css_generators.gradient_type,
                    gradient_linear: dict.tools.css_generators.gradient_linear,
                    gradient_radial: dict.tools.css_generators.gradient_radial,
                    gradient_angle: dict.tools.css_generators.gradient_angle,
                    glass_blur: dict.tools.css_generators.glass_blur,
                    glass_transparency: dict.tools.css_generators.glass_transparency,
                    glass_outline: dict.tools.css_generators.glass_outline,
                    copy_css: dict.tools.css_generators.copy_css,
                    copied: dict.tools.css_generators.copied,
                }}
            />

            {/* SEO Content */}
            {/* SEO Content */}
            <RichContentSection content={dict.tools.css_generators as ToolContent} />

            <RelatedTools
                currentSlug="css-generators"
                category="image"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.css_generators.title}
                description={dict.tools.css_generators.description}
                url={`https://www.cheetset.com/${lang}/tools/css-generators`}
            />
        </div>
    );
}
