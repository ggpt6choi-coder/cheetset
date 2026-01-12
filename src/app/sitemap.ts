import { MetadataRoute } from 'next'

import { posts } from '@/data/posts'
import { tools } from '@/config/tools'
import { BASE_URL } from '@/utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = ['en', 'ko', 'ja']

    // Base routes structure
    const baseRoutes = [
        '',
        '/blog',
        '/privacy',
        '/terms',
        '/about',
        '/contact',
        '/tools'
    ]

    // Add tool routes
    const toolRoutes = tools.map(tool => `/tools/${tool.slug}`)
    const allPageRoutes = [...baseRoutes, ...toolRoutes]

    // Generate static routes entries
    const staticEntries = languages.flatMap((lang) =>
        allPageRoutes.map((route) => {
            const path = `${lang}${route}`
            const fullUrl = `${BASE_URL}/${path}`

            // Create language alternates for search engines
            const alternates = {
                languages: languages.reduce((acc, l) => {
                    acc[l] = `${BASE_URL}/${l}${route}`
                    return acc
                }, {} as Record<string, string>)
            }

            return {
                url: fullUrl,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: route === '' ? 1 : 0.8,
                alternates,
            }
        })
    )

    // Generate blog entries
    const blogEntries = posts.map((post) => {
        const route = `/blog/${post.slug}`
        const fullUrl = `${BASE_URL}/${post.lang}${route}`

        // Blog posts might not exist in all languages, checking posts array would be ideal
        // For now, assuming distinct posts per language or manual translation linkage
        // Since the current data structure (posts) has 'lang' property, we group by slug if shared
        // But typically blog posts are unique. If they are translations of each other with same slug:

        // Finding alternates if same slug exists in other languages
        const alternates = {
            languages: posts
                .filter(p => p.slug === post.slug)
                .reduce((acc, p) => {
                    acc[p.lang] = `${BASE_URL}/${p.lang}/blog/${p.slug}`
                    return acc
                }, {} as Record<string, string>)
        }

        return {
            url: fullUrl,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates,
        }
    })

    return [...staticEntries, ...blogEntries]
}
