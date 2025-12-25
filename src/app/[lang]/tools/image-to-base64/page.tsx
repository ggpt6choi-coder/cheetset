import { getDictionary } from "@/dictionaries/get-dictionary";
import ImageToBase64Client from './ImageToBase64Client';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';

type Locale = "en" | "ko" | "ja";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dict = await getDictionary(lang as Locale) as any;

    return {
        title: `${dict.tools.image_to_base64.title} | Cheetset`,
        description: dict.tools.image_to_base64.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/image-to-base64`,
        },
    };
}

export default async function ImageToBase64Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dict = await getDictionary(lang as Locale) as any;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ImageToBase64Client dict={dict} />
            <RichContentSection content={dict.tools.image_to_base64} />
            <RelatedTools
                currentSlug="image-to-base64"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.image_to_base64.title}
                description={dict.tools.image_to_base64.description}
                url={`https://cheetset.com/${lang}/tools/image-to-base64`}
            />
        </div>
    );
}
