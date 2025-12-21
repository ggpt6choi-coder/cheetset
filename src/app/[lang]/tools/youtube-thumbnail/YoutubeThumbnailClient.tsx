'use client';

import React, { useState } from 'react';
import { Download, Youtube, Image as ImageIcon, Search } from 'lucide-react';

interface YoutubeThumbnailClientProps {
    labels: {
        title: string;
        description: string;
        input_placeholder: string;
        extract_button: string;
        download_image: string;
        quality_max: string;
        quality_high: string;
        quality_medium: string;
        quality_standard: string;
        error_invalid_url: string;
    };
}

interface ThumbnailOption {
    label: string;
    url: string;
    width: number;
    height: number;
}

export default function YoutubeThumbnailClient({ labels }: YoutubeThumbnailClientProps) {
    const [url, setUrl] = useState('');
    const [thumbnails, setThumbnails] = useState<ThumbnailOption[]>([]);
    const [error, setError] = useState<string | null>(null);

    const extractVideoId = (inputUrl: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleExtract = () => {
        setError(null);
        setThumbnails([]);

        const videoId = extractVideoId(url);

        if (!videoId) {
            setError(labels.error_invalid_url);
            return;
        }

        const options: ThumbnailOption[] = [
            {
                label: labels.quality_max,
                url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                width: 1280,
                height: 720
            },
            {
                label: labels.quality_high,
                url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                width: 480,
                height: 360
            },
            {
                label: labels.quality_medium,
                url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                width: 320,
                height: 180
            },
            {
                label: labels.quality_standard,
                url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                width: 640,
                height: 480
            }
        ];

        setThumbnails(options);
    };

    const handleDownload = async (imageUrl: string, fileName: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            // Fallback for CORS issues or other errors: open in new tab
            window.open(imageUrl, '_blank');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                        <Youtube className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    {labels.title}
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700"
                            placeholder={labels.input_placeholder}
                            onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
                        />
                    </div>
                    <button
                        onClick={handleExtract}
                        className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full sm:w-auto"
                    >
                        {labels.extract_button}
                    </button>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-8">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                    {error}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}

                {thumbnails.length > 0 && (
                    <div className="space-y-8 animate-fade-in">
                        {thumbnails.map((thumb, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-indigo-500" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                                            {thumb.label}
                                        </span>
                                        <span className="text-sm text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                                            {thumb.width}x{thumb.height}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(thumb.url, `youtube-thumbnail-${thumb.width}x${thumb.height}.jpg`)}
                                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        <Download className="w-4 h-4 mr-1.5" />
                                        {labels.download_image}
                                    </button>
                                </div>
                                <div className="relative aspect-video group bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                    {/* Using standard img tag instead of Next.js Image to allow external URLs without whitelisting all domains/patterns */}
                                    <img
                                        src={thumb.url}
                                        alt={`Thumbnail ${thumb.label}`}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => handleDownload(thumb.url, `youtube-thumbnail-${thumb.width}x${thumb.height}.jpg`)}
                                            className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            {labels.download_image}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
