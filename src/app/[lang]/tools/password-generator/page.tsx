import { getDictionary } from "@/dictionaries/get-dictionary";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.password_generator.title,
        description: dict.tools.password_generator.description,
        path: '/tools/password-generator',
        lang,
        keywords: dict.tools.password_generator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function PasswordGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.password_generator.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.password_generator.description}
                    </p>
                </div>

                <PasswordGeneratorClient
                    labels={{
                        title: dict.tools.password_generator.title,
                        description: dict.tools.password_generator.description,
                        password_length: dict.tools.password_generator.password_length,
                        include_uppercase: dict.tools.password_generator.include_uppercase,
                        include_lowercase: dict.tools.password_generator.include_lowercase,
                        include_numbers: dict.tools.password_generator.include_numbers,
                        include_symbols: dict.tools.password_generator.include_symbols,
                        generate: dict.tools.password_generator.generate,
                        copy: dict.tools.password_generator.copy,
                        copied: dict.tools.password_generator.copied,
                        strength: dict.tools.password_generator.strength,
                        weak: dict.tools.password_generator.weak,
                        medium: dict.tools.password_generator.medium,
                        strong: dict.tools.password_generator.strong,
                    }}
                    lang={lang}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <RichContentSection content={dict.tools.password_generator as ToolContent} />
                </div>

                <RelatedTools
                    currentSlug="password-generator"
                    category="daily"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.password_generator.title}
                    description={dict.tools.password_generator.description}
                    url={`https://www.cheetset.com/${lang}/tools/password-generator`}
                />
            </div>
        </div>
    );
}
