import { getDictionary } from "@/dictionaries/get-dictionary";
import JwtDecoderClient from "@/components/tools/JwtDecoderClient";
import RelatedTools from "@/components/tools/RelatedTools";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.jwt_decoder.title} - ${dict.common.title}`,
        description: dict.tools.jwt_decoder.description,
        keywords: ['jwt decoder', 'jwt debugger', 'jwt token', 'json web token', 'jwt 디코더', 'jwt 토큰'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/jwt-decoder`,
        },
        openGraph: {
            title: `${dict.tools.jwt_decoder.title} - ${dict.common.title}`,
            description: dict.tools.jwt_decoder.description,
            url: `https://cheetset.com/${lang}/tools/jwt-decoder`,
            type: 'website',
        },
    };
}

export default async function JwtDecoderPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.jwt_decoder.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.jwt_decoder.description}
                    </p>
                </div>

                <JwtDecoderClient
                    labels={{
                        title: dict.tools.jwt_decoder.title,
                        description: dict.tools.jwt_decoder.description,
                        placeholder: dict.tools.jwt_decoder.placeholder,
                        header_label: dict.tools.jwt_decoder.header_label,
                        payload_label: dict.tools.jwt_decoder.payload_label,
                        signature_label: dict.tools.jwt_decoder.signature_label,
                        error_invalid: dict.tools.jwt_decoder.error_invalid,
                        privacy_alert: dict.tools.jwt_decoder.privacy_alert,
                    }}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.jwt_decoder.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="jwt-decoder"
                    category="developer"
                    lang={lang}
                />
            </div>
        </div>
    );
}
