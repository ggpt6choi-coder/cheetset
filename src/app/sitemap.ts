import { MetadataRoute } from 'next'

import { posts } from '@/data/posts'

const baseUrl = 'https://cheetset.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/blog', '/privacy', '/tools', '/tools/word-counter', '/tools/json-formatter', '/tools/lotto-generator']
    const languages = ['en', 'ko', 'ja']

    const staticRoutes = languages.flatMap((lang) =>
        routes.map((route) => ({
            url: `${baseUrl}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/${post.lang}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}
