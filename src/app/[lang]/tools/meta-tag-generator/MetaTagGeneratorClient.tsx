'use client';

import { useState, useEffect } from 'react';
import { Share2, Copy, Check, RefreshCw, Globe, Layout } from 'lucide-react';

interface MetaTagGeneratorClientProps {
    labels: {
        title: string;
        description: string;
        input_section: string;
        preview_section: string;
        code_section: string;
        site_title: string;
        site_description: string;
        site_url: string;
        image_url: string;
        google_preview: string;
        facebook_preview: string;
        copy_code: string;
        copied: string;
    };
}

export default function MetaTagGeneratorClient({ labels }: MetaTagGeneratorClientProps) {
    const [values, setValues] = useState({
        title: '',
        description: '',
        url: '',
        image: ''
    });
    const [copied, setCopied] = useState(false);

    // Default values for preview if empty
    const previewDefaults = {
        title: 'Page Title | Website Name',
        description: 'This is an example description that will appear in search results and social media shares. It should be concise and descriptive.',
        url: 'example.com',
        image: 'https://via.placeholder.com/1200x630/e2e8f0/64748b?text=OG+Image+Preview'
    };

    const handleChange = (field: keyof typeof values, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
    };

    const generateCode = () => {
        const { title, description, url, image } = values;
        return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${image}" />`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Share2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Layout className="w-5 h-5 text-indigo-500" />
                            {labels.input_section}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {labels.site_title}
                                </label>
                                <input
                                    type="text"
                                    value={values.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="e.g. My Awesome Website"
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{values.title.length} / 60</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {labels.site_description}
                                </label>
                                <textarea
                                    value={values.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    placeholder="e.g. The best website for..."
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{values.description.length} / 160</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {labels.site_url}
                                </label>
                                <input
                                    type="text"
                                    value={values.url}
                                    onChange={(e) => handleChange('url', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {labels.image_url}
                                </label>
                                <input
                                    type="text"
                                    value={values.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="https://example.com/og-image.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-500" />
                                {labels.code_section}
                            </h2>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? labels.copied : labels.copy_code}
                            </button>
                        </div>
                        <pre className="p-4 bg-gray-900 rounded-xl overflow-x-auto">
                            <code className="text-sm text-gray-300 font-mono whitespace-pre">
                                {generateCode()}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Right Column: Previews */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            {labels.preview_section}
                        </h2>

                        {/* Google Preview */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">{labels.google_preview}</h3>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm max-w-[600px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-500">
                                        G
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900">
                                            {values.title || 'Website Name'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {values.url || previewDefaults.url}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 truncate">
                                    {values.title || previewDefaults.title}
                                </div>
                                <div className="text-sm text-[#4d5156] line-clamp-2">
                                    {values.description || previewDefaults.description}
                                </div>
                            </div>
                        </div>

                        {/* Facebook/OG Preview */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-3">{labels.facebook_preview}</h3>
                            <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden max-w-[524px]">
                                <div className="aspect-[1.91/1] bg-gray-200 relative overflow-hidden">
                                    {values.image ? (
                                        <img
                                            src={values.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = previewDefaults.image;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-[#f0f2f5]">
                                    <div className="text-xs text-gray-500 uppercase mb-1 truncate">
                                        {values.url ? new URL(values.url.startsWith('http') ? values.url : `https://${values.url}`).hostname : 'EXAMPLE.COM'}
                                    </div>
                                    <div className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
                                        {values.title || previewDefaults.title}
                                    </div>
                                    <div className="text-sm text-gray-600 line-clamp-1">
                                        {values.description || previewDefaults.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
