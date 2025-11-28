import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.nav.blog} - ${dict.common.title} `,
    };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const posts = [
        {
            slug: 'resume-word-count',
            title: 'Resume Word Count: With Spaces vs Without Spaces',
            description: 'Confused about word counts in resumes? Learn the difference between "with spaces" and "without spaces" and get tips for optimizing your resume length.',
            date: '2025-11-28',
            lang: 'en'
        },
        {
            slug: 'resume-word-count',
            title: '자기소개서 글자 수 세기: 공백 포함 vs 미포함 차이점 완벽 정리',
            description: '자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.',
            date: '2025-11-28',
            lang: 'ko'
        },
        {
            slug: 'resume-word-count',
            title: '履歴書の文字数カウント：空白あり vs 空白なし 完全ガイド',
            description: '履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。',
            date: '2025-11-28',
            lang: 'ja'
        }
    ];

    const displayPosts = posts.filter(post => post.lang === lang);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {dict.nav.blog}
            </h1>

            <div className="grid gap-8">
                {displayPosts.map((post) => (
                    <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                    {post.lang === 'ko' ? 'Korean' : 'English'}
                                </span>
                            </div>
                            <a href={`/${lang}/blog/${post.slug}`} className="block mt-2">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                    {post.title}
                                </h2>
                                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                                    {post.description}
                                </p>
                            </a>
                            <div className="mt-4">
                                <a href={`/${lang}/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                    Read more &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
