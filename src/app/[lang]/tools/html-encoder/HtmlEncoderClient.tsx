'use client';

import { useState } from 'react';
import { Code, Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';

interface HtmlEncoderClientProps {
    labels: {
        title: string;
        description: string;
        input_placeholder: string;
        encode: string;
        decode: string;
        copy: string;
        copied: string;
        clear: string;
    };
}

export default function HtmlEncoderClient({ labels }: HtmlEncoderClientProps) {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const encode = () => {
        const textarea = document.createElement('textarea');
        textarea.innerText = text;
        setText(textarea.innerHTML);
    };

    const decode = () => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        setText(textarea.value);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                <div className="relative mb-6">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={labels.input_placeholder}
                        className="w-full h-64 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg leading-relaxed font-mono"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            title={labels.copy}
                        >
                            {copied ? (
                                <Check className="w-5 h-5 text-green-500" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            title={labels.clear}
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={encode}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                        {labels.encode}
                    </button>
                    <button
                        onClick={decode}
                        className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                        {labels.decode}
                    </button>
                </div>
            </div>
        </div>
    );
}
