'use client';

import { useState, useEffect } from 'react';
import { Fingerprint, Copy, RefreshCw, Trash2, Check } from 'lucide-react';

interface UUIDGeneratorClientProps {
    labels: {
        title: string;
        description: string;
        subtitle: string;
        generate: string;
        copy: string;
        copy_all: string;
        quantity: string;
        copied: string;
        all_copied: string;
        clear: string;
    };
}

export default function UUIDGeneratorClient({ labels }: UUIDGeneratorClientProps) {
    // State
    const [quantity, setQuantity] = useState<number>(5);
    const [uuids, setUuids] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [allCopied, setAllCopied] = useState<boolean>(false);

    // Initial Generation
    useEffect(() => {
        generateUUIDs();
    }, []);

    // Logic: Generate UUIDs
    const generateUUIDs = () => {
        const newUuids = Array.from({ length: quantity }, () => crypto.randomUUID());
        setUuids(newUuids);
        setAllCopied(false);
    };

    // Logic: Copy Single UUID
    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Logic: Copy All UUIDs
    const copyAllToClipboard = () => {
        const allText = uuids.join('\n');
        navigator.clipboard.writeText(allText);
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
    };

    // Logic: Clear
    const clearUUIDs = () => {
        setUuids([]);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                        <Fingerprint className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {labels.subtitle}
                </p>
            </div>

            {/* Control Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.quantity}: <span className="text-indigo-600 font-bold">{quantity}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full accent-indigo-600"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={generateUUIDs}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {labels.generate}
                        </button>
                        {uuids.length > 0 && (
                            <button
                                onClick={clearUUIDs}
                                className="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                aria-label={labels.clear}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Result Area */}
            {uuids.length > 0 && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={copyAllToClipboard}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${allCopied
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                        >
                            {allCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {allCopied ? labels.all_copied : labels.copy_all}
                        </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 transition-colors group">
                                <span className="font-mono text-gray-600 dark:text-gray-300 text-sm sm:text-base break-all">
                                    {uuid}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(uuid, index)}
                                    className={`ml-4 p-2 rounded-lg transition-colors ${copiedIndex === index
                                            ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                                            : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 opacity-0 group-hover:opacity-100 focus:opacity-100'
                                        }`}
                                    title={labels.copy}
                                >
                                    {copiedIndex === index ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
