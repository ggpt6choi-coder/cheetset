import { getDictionary } from "@/dictionaries/get-dictionary";
import Base64ToImageClient from './Base64ToImageClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';

import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dict = await getDictionary(lang as Locale) as any;

    return constructMetadata({
        title: dict.tools.base64_to_image.title,
        description: dict.tools.base64_to_image.description,
        path: '/tools/base64-to-image',
        lang,
    });
}

export default async function Base64ToImagePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dict = await getDictionary(lang as Locale) as any;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Base64ToImageClient dict={dict} />
            <RichContentSection content={dict.tools.base64_to_image} />
            <RelatedTools
                currentSlug="base64-to-image"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.base64_to_image.title}
                description={dict.tools.base64_to_image.description}
                url={`https://cheetset.com/${lang}/tools/base64-to-image`}
            />
        </div>
    );
}
