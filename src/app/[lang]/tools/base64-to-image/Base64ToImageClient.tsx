'use client';

import { useState } from 'react';

interface Dictionary {
    tools: {
        base64_to_image: {
            title: string;
            description: string;
            input_placeholder: string;
            download: string;
            error_invalid_format: string;
        };
    };
}

interface Props {
    dict: Dictionary;
}

export default function Base64ToImageClient({ dict }: Props) {
    const [base64, setBase64] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setBase64(value);
        setError('');

        if (value && !value.startsWith('data:image/')) {
            setError(dict.tools.base64_to_image.error_invalid_format);
        }
    };

    const handleDownload = () => {
        if (!base64 || error) return;

        const link = document.createElement('a');
        link.href = base64;

        // Extract extension from data URL if possible
        let extension = 'png';
        const match = base64.match(/^data:image\/(\w+);base64,/);
        if (match && match[1]) {
            extension = match[1];
        }

        link.download = `decoded-image.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.tools.base64_to_image.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    {dict.tools.base64_to_image.description}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Input Area */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <textarea
                        value={base64}
                        onChange={handleInputChange}
                        placeholder={dict.tools.base64_to_image.input_placeholder}
                        className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                    {error && (
                        <p className="mt-2 text-red-500 font-medium">{error}</p>
                    )}
                </div>

                {/* Preview Area */}
                {base64 && !error && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105"
                                >
                                    {dict.tools.base64_to_image.download}
                                </button>
                            </div>
                            <div className="flex justify-center bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={base64} alt="Preview" className="max-h-[500px] object-contain" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
