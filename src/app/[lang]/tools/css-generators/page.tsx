import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CssGeneratorsClient from './CssGeneratorsClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import FAQJsonLd from '@/components/FAQJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.css_generators.title} - ${dict.common.title}`,
        description: dict.tools.css_generators.description,
        openGraph: {
            title: `${dict.tools.css_generators.title} - ${dict.common.title}`,
            description: dict.tools.css_generators.description,
        },
    };
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
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-12">
                <article className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.css_generators.title}</h2>
                    <p>{dict.tools.css_generators.seo_content}</p>
                </article>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.css_generators.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.css_generators.how_to_step1}</li>
                        <li>{dict.tools.css_generators.how_to_step2}</li>
                        <li>{dict.tools.css_generators.how_to_step3}</li>
                        <li>{dict.tools.css_generators.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.css_generators.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.css_generators.faq_1_q}</h4>
                            <p>{dict.tools.css_generators.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.css_generators.faq_2_q}</h4>
                            <p>{dict.tools.css_generators.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.css_generators.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.css_generators.use_case_1}</li>
                        <li>{dict.tools.css_generators.use_case_2}</li>
                        <li>{dict.tools.css_generators.use_case_3}</li>
                    </ul>
                </section>
            </div>

            <RelatedTools
                currentSlug="css-generators"
                category="image"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.css_generators.title}
                description={dict.tools.css_generators.description}
                url={`https://cheetset.com/${lang}/tools/css-generators`}
            />
            <FAQJsonLd
                faqs={[
                    { question: dict.tools.css_generators.faq_1_q, answer: dict.tools.css_generators.faq_1_a },
                    { question: dict.tools.css_generators.faq_2_q, answer: dict.tools.css_generators.faq_2_a }
                ]}
            />
        </div>
    );
}
