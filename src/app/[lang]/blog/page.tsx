import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import { posts } from "@/data/posts";

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
