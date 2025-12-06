'use client';

import { useState } from 'react';
import { Type, Copy, RefreshCw, Check } from 'lucide-react';

interface LoremIpsumClientProps {
    labels: {
        title: string;
        description: string;
        count: string;
        type: string;
        type_paragraphs: string;
        type_sentences: string;
        type_words: string;
        generate: string;
        copy: string;
        copied: string;
    };
}

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const WORDS = LOREM_TEXT.replace(/[.,]/g, '').toLowerCase().split(' ');
const SENTENCES = LOREM_TEXT.split('. ').map(s => s.trim() + '.');

export default function LoremIpsumClient({ labels }: LoremIpsumClientProps) {
    const [count, setCount] = useState<number>(3);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [generatedText, setGeneratedText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const generateText = () => {
        let result = [];

        if (type === 'words') {
            for (let i = 0; i < count; i++) {
                const word = WORDS[i % WORDS.length];
                result.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
            }
            setGeneratedText(result.join(' '));
        } else if (type === 'sentences') {
            for (let i = 0; i < count; i++) {
                result.push(SENTENCES[i % SENTENCES.length]);
            }
            setGeneratedText(result.join(' '));
        } else {
            // Paragraphs
            for (let i = 0; i < count; i++) {
                result.push(LOREM_TEXT);
            }
            setGeneratedText(result.join('\n\n'));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Generate initial text
    useState(() => {
        generateText();
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Type className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
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
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.count}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.type}
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="paragraphs">{labels.type_paragraphs}</option>
                            <option value="sentences">{labels.type_sentences}</option>
                            <option value="words">{labels.type_words}</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={generateText}
                            className="w-full px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none h-[42px]"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {labels.generate}
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="relative">
                    <textarea
                        readOnly
                        value={generatedText}
                        className="w-full h-96 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-serif text-lg leading-relaxed"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        title={labels.copy}
                    >
                        {copied ? (
                            <Check className="w-5 h-5 text-green-500" />
                        ) : (
                            <Copy className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
