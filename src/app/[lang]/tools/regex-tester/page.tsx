import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import RegexTesterClient from './RegexTesterClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.regex_tester.title,
        description: dict.tools.regex_tester.description,
        path: '/tools/regex-tester',
        lang,
        keywords: dict.tools.regex_tester.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function RegexTesterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <RegexTesterClient
                labels={{
                    title: dict.tools.regex_tester.title,
                    description: dict.tools.regex_tester.description,
                    input_label: dict.tools.regex_tester.input_label,
                    text_label: dict.tools.regex_tester.text_label,
                    flags_label: dict.tools.regex_tester.flags_label,
                    cheatsheet_label: dict.tools.regex_tester.cheatsheet_label,
                    no_match: dict.tools.regex_tester.no_match,
                    match_found: dict.tools.regex_tester.match_found,
                    matches_found: dict.tools.regex_tester.matches_found,
                    cheatsheet: {
                        email: dict.tools.regex_tester.cheatsheet.email,
                        url: dict.tools.regex_tester.cheatsheet.url,
                        phone: dict.tools.regex_tester.cheatsheet.phone,
                        date: dict.tools.regex_tester.cheatsheet.date,
                        ipv4: dict.tools.regex_tester.cheatsheet.ipv4,
                        hex: dict.tools.regex_tester.cheatsheet.hex,
                    },
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.regex_tester.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.regex_tester.seo_content}
                    </p>

                    <div className="space-y-12">
                        {/* How to Use */}
                        <RichContentSection content={dict.tools.regex_tester} />

                        {/* Regex Basics (Preserved) */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? '정규표현식 기초 문법' :
                                    lang === 'ja' ? '正規表現の基本構文' :
                                        'Regex Basics'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                    <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                        {lang === 'ko' ? '메타 문자' : lang === 'ja' ? 'メタ文字' : 'Meta Characters'}
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code>.</code> : Any single character</li>
                                        <li><code>^</code> : Start of string</li>
                                        <li><code>$</code> : End of string</li>
                                        <li><code>*</code> : 0 or more</li>
                                        <li><code>+</code> : 1 or more</li>
                                        <li><code>?</code> : 0 or 1</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                    <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                        {lang === 'ko' ? '문자 클래스' : lang === 'ja' ? '文字クラス' : 'Character Classes'}
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code>\d</code> : Digit [0-9]</li>
                                        <li><code>\w</code> : Word char [a-zA-Z0-9_]</li>
                                        <li><code>\s</code> : Whitespace</li>
                                        <li><code>[abc]</code> : a, b, or c</li>
                                        <li><code>[^abc]</code> : Not a, b, or c</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.regex_tester.title}
                description={dict.tools.regex_tester.description}
                url={`https://cheetset.com/${lang}/tools/regex-tester`}
            />
        </div>
    );
}
