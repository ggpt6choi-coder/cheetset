import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import YoutubeThumbnailClient from './YoutubeThumbnailClient';
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
        title: `${dict.tools.youtube_thumbnail.title} - ${dict.common.title}`,
        description: dict.tools.youtube_thumbnail.description,
        openGraph: {
            title: `${dict.tools.youtube_thumbnail.title} - ${dict.common.title}`,
            description: dict.tools.youtube_thumbnail.description,
        },
    };
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
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-12 mb-20">
                <article className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.youtube_thumbnail.title}</h2>
                    <p>{dict.tools.youtube_thumbnail.seo_content}</p>
                </article>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.youtube_thumbnail.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.youtube_thumbnail.how_to_step1}</li>
                        <li>{dict.tools.youtube_thumbnail.how_to_step2}</li>
                        <li>{dict.tools.youtube_thumbnail.how_to_step3}</li>
                        <li>{dict.tools.youtube_thumbnail.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.youtube_thumbnail.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.youtube_thumbnail.faq_1_q}</h4>
                            <p>{dict.tools.youtube_thumbnail.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.youtube_thumbnail.faq_2_q}</h4>
                            <p>{dict.tools.youtube_thumbnail.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.youtube_thumbnail.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.youtube_thumbnail.use_case_1}</li>
                        <li>{dict.tools.youtube_thumbnail.use_case_2}</li>
                        <li>{dict.tools.youtube_thumbnail.use_case_3}</li>
                    </ul>
                </section>
            </div>

            <RelatedTools
                currentSlug="youtube-thumbnail"
                category="image"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.youtube_thumbnail.title}
                description={dict.tools.youtube_thumbnail.description}
                url={`https://cheetset.com/${lang}/tools/youtube-thumbnail`}
            />
            <FAQJsonLd
                faqs={[
                    { question: dict.tools.youtube_thumbnail.faq_1_q, answer: dict.tools.youtube_thumbnail.faq_1_a },
                    { question: dict.tools.youtube_thumbnail.faq_2_q, answer: dict.tools.youtube_thumbnail.faq_2_a }
                ]}
            />
        </div>
    );
}
