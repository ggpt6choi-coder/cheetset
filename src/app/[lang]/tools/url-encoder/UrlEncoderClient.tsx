'use client';

import { useState } from 'react';
import { Link, Copy, Check, Trash2, ArrowDown } from 'lucide-react';

interface UrlEncoderClientProps {
    labels: {
        title: string;
        description: string;
        input_label: string;
        output_label: string;
        encode: string;
        decode: string;
        copy: string;
        copied: string;
        clear: string;
        placeholder: string;
    };
}

export default function UrlEncoderClient({ labels }: UrlEncoderClientProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncode = () => {
        try {
            // Use encodeURIComponent for full encoding, but sometimes users want encodeURI.
            // Generally encodeURIComponent is safer for parameters.
            setOutput(encodeURIComponent(input));
        } catch (e) {
            setOutput('Error: Unable to encode text');
        }
    };

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
        } catch (e) {
            setOutput('Error: Invalid URL encoding');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Link className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
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
                {/* Input Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {labels.input_label}
                        </label>
                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            {labels.clear}
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={labels.placeholder}
                        className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                        onClick={handleEncode}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        <ArrowDown className="w-5 h-5" />
                        {labels.encode}
                    </button>
                    <button
                        onClick={handleDecode}
                        className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowDown className="w-5 h-5" />
                        {labels.decode}
                    </button>
                </div>

                {/* Output Section */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {labels.output_label}
                        </label>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className={`flex items-center gap-1 text-sm transition-colors ${output
                                    ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700'
                                    : 'text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? labels.copied : labels.copy}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 resize-none font-mono text-sm"
                    />
                </div>
            </div>
        </div>
    );
}
