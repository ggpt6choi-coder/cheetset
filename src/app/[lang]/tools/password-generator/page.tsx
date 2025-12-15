import { getDictionary } from "@/dictionaries/get-dictionary";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
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
                        <h2 className="text-2xl font-bold mb-4">
                            {dict.tools.password_generator.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {dict.tools.password_generator.seo_content}
                        </p>

                        <div className="space-y-12">
                            {/* How to Use */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                                    {dict.tools.password_generator.how_to_title}
                                </h3>
                                <ul className="space-y-3 text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                    <li>{dict.tools.password_generator.how_to_step1}</li>
                                    <li>{dict.tools.password_generator.how_to_step2}</li>
                                    <li>{dict.tools.password_generator.how_to_step3}</li>
                                    <li>{dict.tools.password_generator.how_to_step4}</li>
                                </ul>
                            </div>

                            {/* Use Cases */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                    {dict.tools.password_generator.use_cases_title}
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                        {dict.tools.password_generator.use_case_1}
                                    </li>
                                    <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                        {dict.tools.password_generator.use_case_2}
                                    </li>
                                    <li className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                                        {dict.tools.password_generator.use_case_3}
                                    </li>
                                </ul>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-sm">3</span>
                                    {dict.tools.password_generator.faq_title}
                                </h3>
                                <div className="space-y-4">
                                    <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            {dict.tools.password_generator.faq_1_q}
                                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {dict.tools.password_generator.faq_1_a}
                                        </div>
                                    </details>
                                    <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            {dict.tools.password_generator.faq_2_q}
                                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {dict.tools.password_generator.faq_2_a}
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="password-generator"
                    category="daily"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.password_generator.title}
                    description={dict.tools.password_generator.description}
                    url={`https://cheetset.com/${lang}/tools/password-generator`}
                />
            </div>
        </div>
    );
}
