'use client';

import { useState, useRef } from 'react';

interface Dictionary {
    tools: {
        image_to_base64: {
            title: string;
            description: string;
            upload_label: string;
            copy: string;
            copied: string;
            clear: string;
            error_file_too_large: string;
        };
    };
}

interface Props {
    dict: Dictionary;
}

export default function ImageToBase64Client({ dict }: Props) {
    const [base64, setBase64] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        setError('');
        setCopied(false);

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError(dict.tools.image_to_base64.error_file_too_large);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setBase64(result);
            setPreview(result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(base64);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const clearAll = () => {
        setBase64('');
        setPreview(null);
        setError('');
        setCopied(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {dict.tools.image_to_base64.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    {dict.tools.image_to_base64.description}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Upload Area */}
                <div
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800/50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="space-y-4">
                        <div className="text-6xl">🖼️</div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                            {dict.tools.image_to_base64.upload_label}
                        </p>
                        {error && (
                            <p className="text-red-500 font-medium">{error}</p>
                        )}
                    </div>
                </div>

                {/* Result Area */}
                {base64 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview</h3>
                            <div className="flex justify-center bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={preview!} alt="Preview" className="max-h-64 object-contain" />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Base64 String</h3>
                                <div className="space-x-2">
                                    <button
                                        onClick={clearAll}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                    >
                                        {dict.tools.image_to_base64.clear}
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`px-6 py-2 rounded-full font-bold text-white transition-all transform hover:scale-105 ${copied
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                    >
                                        {copied ? dict.tools.image_to_base64.copied : dict.tools.image_to_base64.copy}
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={base64}
                                readOnly
                                className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                onClick={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
