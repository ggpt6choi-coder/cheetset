import { MetadataRoute } from 'next'

const baseUrl = 'https://cheetset.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/blog', '/privacy', '/tools', '/tools/word-counter', '/tools/json-formatter']
    const languages = ['en', 'ko', 'ja']

    const sitemap = languages.flatMap((lang) =>
        routes.map((route) => ({
            url: `${baseUrl}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    return sitemap
}
