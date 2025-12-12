import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { posts } from '@/data/posts';

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

// Dynamic imports for blog posts
const JsonFormattingGuide = dynamic(() => import('@/components/blog/posts/JsonFormattingGuide'));
const CharacterEncodingGuide = dynamic(() => import('@/components/blog/posts/CharacterEncodingGuide'));
const ResumeWordCount = dynamic(() => import('@/components/blog/posts/ResumeWordCount'));
const ServerTimeTicketingGuide = dynamic(() => import('@/components/blog/posts/ServerTimeTicketingGuide'));
const ProductivityToolsGuide = dynamic(() => import('@/components/blog/posts/ProductivityToolsGuide'));
const Base64EncodingGuide = dynamic(() => import('@/components/blog/posts/Base64EncodingGuide'));
const LotteryWinningStrategy = dynamic(() => import('@/components/blog/posts/LotteryWinningStrategy'));
const ResumeWritingGuide = dynamic(() => import('@/components/blog/posts/ResumeWritingGuide'));
const OnlineShoppingTips = dynamic(() => import('@/components/blog/posts/OnlineShoppingTips'));
const SalaryCalculatorGuide2025 = dynamic(() => import('@/components/blog/posts/SalaryCalculatorGuide2025'));
const StockAverageDownStrategy = dynamic(() => import('@/components/blog/posts/StockAverageDownStrategy'));
const Base64ImageGuide = dynamic(() => import('@/components/blog/posts/Base64ImageGuide'));
const PdfMergeGuide = dynamic(() => import('@/components/blog/posts/PdfMergeGuide'));
const ReactionTimeGuide = dynamic(() => import('@/components/blog/posts/ReactionTimeGuide'));
const CompoundInterestGuide = dynamic(() => import('@/components/blog/posts/CompoundInterestGuide'));
const UuidGuide = dynamic(() => import('@/components/blog/posts/UuidGuide'));
const JwtGuide = dynamic(() => import('@/components/blog/posts/JwtGuide'));
const PomodoroTechnique = dynamic(() => import('@/components/blog/posts/PomodoroTechnique'));
const QrCodeGuide = dynamic(() => import('@/components/blog/posts/QrCodeGuide'));
const HeicToJpgGuide = dynamic(() => import('@/components/blog/posts/HeicToJpgGuide'));
const YoutubeRevenueCalculatorGuide = dynamic(() => import('@/components/blog/posts/YoutubeRevenueCalculatorGuide'));
const ImageCompressionGuide = dynamic(() => import('@/components/blog/posts/ImageCompressionGuide'));
const ImageCropperGuide = dynamic(() => import('@/components/blog/posts/ImageCropperGuide'));
const ImageResizerGuide = dynamic(() => import('@/components/blog/posts/ImageResizerGuide'));
const LoanCalculatorGuide = dynamic(() => import('@/components/blog/posts/LoanCalculatorGuide'));
const BmrCalculatorGuide = dynamic(() => import('@/components/blog/posts/BmrCalculatorGuide'));

const ExifViewerGuide = dynamic(() => import('@/components/blog/posts/ExifViewerGuide'));
const ImageFiltersGuide = dynamic(() => import('@/components/blog/posts/ImageFiltersGuide'));

const POSTS: Record<string, React.ComponentType<any>> = {
    'json-formatting-guide': JsonFormattingGuide,
    'character-encoding-guide': CharacterEncodingGuide,
    'resume-word-count': ResumeWordCount,
    'server-time-ticketing-guide': ServerTimeTicketingGuide,
    'productivity-tools-guide': ProductivityToolsGuide,
    'base64-encoding-guide': Base64EncodingGuide,
    'lottery-winning-strategy': LotteryWinningStrategy,
    'resume-writing-guide': ResumeWritingGuide,
    'online-shopping-tips': OnlineShoppingTips,
    'salary-calculator-guide-2025': SalaryCalculatorGuide2025,
    'stock-average-down-strategy': StockAverageDownStrategy,
    'base64-image-guide': Base64ImageGuide,
    'compound-interest-guide': CompoundInterestGuide,
    'uuid-guide': UuidGuide,
    'jwt-guide': JwtGuide,
    'pdf-merge-guide': PdfMergeGuide,
    'reaction-time-guide': ReactionTimeGuide,
    'pomodoro-technique': PomodoroTechnique,
    'qr-code-guide': QrCodeGuide,
    'heic-to-jpg-guide': HeicToJpgGuide,
    'youtube-revenue-calculator-guide': YoutubeRevenueCalculatorGuide,
    'image-compression-guide': ImageCompressionGuide,
    'image-cropper-guide': ImageCropperGuide,
    'image-resizer-guide': ImageResizerGuide,
    'loan-calculator-guide': LoanCalculatorGuide,
    'bmr-calculator-guide': BmrCalculatorGuide,
    'exif-viewer-guide': ExifViewerGuide,
    'image-filters-guide': ImageFiltersGuide,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;

    // Try to find metadata in posts.ts first
    const postData = posts.find(p => p.slug === slug && p.lang === lang) ||
        posts.find(p => p.slug === slug && p.lang === 'en');

    if (postData) {
        return {
            title: postData.title,
            description: postData.description,
            alternates: {
                languages: {
                    'en': `/en/blog/${slug}`,
                    'ko': `/ko/blog/${slug}`,
                    'ja': `/ja/blog/${slug}`,
                },
            },
        };
    }

    // If not in posts.ts, try to load MDX metadata
    try {
        let mdxModule;
        try {
            mdxModule = await import(`@/content/posts/${slug}.${lang}.mdx`);
        } catch (e) {
            mdxModule = await import(`@/content/posts/${slug}.en.mdx`);
        }

        if (mdxModule && mdxModule.metadata) {
            return {
                title: mdxModule.metadata.title,
                description: mdxModule.metadata.description,
                alternates: {
                    languages: {
                        'en': `/en/blog/${slug}`,
                        'ko': `/ko/blog/${slug}`,
                        'ja': `/ja/blog/${slug}`,
                    },
                },
            };
        }
    } catch (e) {
        // Ignore error
    }

    return {
        title: 'Blog Post',
    };
}

import ShareButtons from '@/components/blog/ShareButtons';

// ... (existing imports)

export default async function BlogPostPage({ params }: Props) {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang as Locale);
    let PostComponent = POSTS[slug];

    if (!PostComponent) {
        try {
            let mdxModule;
            try {
                mdxModule = await import(`@/content/posts/${slug}.${lang}.mdx`);
            } catch (e) {
                try {
                    mdxModule = await import(`@/content/posts/${slug}.en.mdx`);
                } catch (e2) {
                    console.error(`Failed to load MDX for slug: ${slug}`, e2);
                }
            }

            if (mdxModule) {
                PostComponent = mdxModule.default;
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (!PostComponent) {
        notFound();
    }

    // Fetch metadata for JSON-LD
    const meta = await generateMetadata({ params: Promise.resolve({ lang, slug }) });
    const title = (meta.title as string) || 'Blog Post';
    const description = meta.description || '';

    return (
        <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: title,
                    description: description,
                    image: `https://cheetset.com/og-image.png`,
                    datePublished: '2025-12-06', // Should be dynamic ideally
                    author: {
                        '@type': 'Organization',
                        name: 'CheetSet',
                        url: 'https://cheetset.com',
                    },
                }}
            />
            <div className="prose prose-lg dark:prose-invert mx-auto">
                <PostComponent lang={lang} />
                <ShareButtons
                    title={title}
                    url={`https://cheetset.com/${lang}/blog/${slug}`}
                    dict={dict}
                />
            </div>
        </article>
    );
}
