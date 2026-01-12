import { getDictionary } from "@/dictionaries/get-dictionary";
import MarkdownPreviewClient from "./MarkdownPreviewClient";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.markdown_preview.title,
        description: dict.tools.markdown_preview.description,
        path: '/tools/markdown-preview',
        lang,
        keywords: dict.tools.markdown_preview.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function MarkdownPreviewPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.markdown_preview.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.markdown_preview.description}
                    </p>
                </div>

                <div className="mb-12">
                    <MarkdownPreviewClient
                        labels={{
                            placeholder: dict.tools.markdown_preview.placeholder,
                            heading: dict.tools.markdown_preview.heading,
                            preview: dict.tools.markdown_preview.preview
                        }}
                    />
                </div>

                <div className="max-w-4xl mx-auto">
                    <RichContentSection content={dict.tools.markdown_preview as ToolContent} />
                </div>
            </div>

            <RelatedTools
                currentSlug="markdown-preview"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.markdown_preview.title}
                description={dict.tools.markdown_preview.description}
                url={`https://www.cheetset.com/${lang}/tools/markdown-preview`}
            />
        </div>
    );
}
