import { getDictionary } from "@/dictionaries/get-dictionary";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";
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
        title: `${dict.tools.password_generator.title} - ${dict.common.title}`,
        description: dict.tools.password_generator.description,
        keywords: ['password generator', 'secure password', 'random password', 'strong password', '비밀번호 생성기', '안전한 비밀번호', 'パスワード生成'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/password-generator`,
        },
        openGraph: {
            title: `${dict.tools.password_generator.title} - ${dict.common.title}`,
            description: dict.tools.password_generator.description,
            url: `https://cheetset.com/${lang}/tools/password-generator`,
            type: 'website',
        },
    };
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
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.password_generator.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="password-generator"
                    category="daily"
                    lang={lang}
                />
            </div>
        </div>
    );
}
