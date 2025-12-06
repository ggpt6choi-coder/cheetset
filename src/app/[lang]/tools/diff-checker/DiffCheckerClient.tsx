'use client';

import { useState } from 'react';
import * as Diff from 'diff';
import { GitCompare, Trash2, ArrowRight } from 'lucide-react';

interface DiffCheckerClientProps {
    labels: {
        title: string;
        description: string;
        original: string;
        modified: string;
        compare: string;
        clear: string;
        legend_added: string;
        legend_removed: string;
        no_diff: string;
    };
}

export default function DiffCheckerClient({ labels }: DiffCheckerClientProps) {
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    const [diffResult, setDiffResult] = useState<Diff.Change[] | null>(null);

    const handleCompare = () => {
        const diff = Diff.diffLines(original, modified);
        setDiffResult(diff);
    };

    const handleClear = () => {
        setOriginal('');
        setModified('');
        setDiffResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <GitCompare className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Controls */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-green-200 dark:bg-green-900/50 border border-green-300 dark:border-green-800 rounded-sm"></span>
                            <span className="text-gray-600 dark:text-gray-400">{labels.legend_added}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-red-200 dark:bg-red-900/50 border border-red-300 dark:border-red-800 rounded-sm"></span>
                            <span className="text-gray-600 dark:text-gray-400">{labels.legend_removed}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClear}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {labels.clear}
                        </button>
                        <button
                            onClick={handleCompare}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <GitCompare className="w-4 h-4 mr-2" />
                            {labels.compare}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700 h-[600px]">
                    {/* Original Input */}
                    <div className="flex flex-col h-full">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                            {labels.original}
                        </div>
                        <textarea
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            className="flex-1 w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 border-none"
                            spellCheck={false}
                            placeholder="..."
                        />
                    </div>

                    {/* Modified Input */}
                    <div className="flex flex-col h-full">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                            {labels.modified}
                        </div>
                        <textarea
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            className="flex-1 w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 border-none"
                            spellCheck={false}
                            placeholder="..."
                        />
                    </div>
                </div>

                {/* Diff Result */}
                {diffResult && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                            Diff Result
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 overflow-auto max-h-[400px] font-mono text-sm">
                            {diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed ? (
                                <div className="text-center text-gray-500 py-8">
                                    {labels.no_diff}
                                </div>
                            ) : (
                                diffResult.map((part, index) => {
                                    const color = part.added
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                        : part.removed
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                            : 'text-gray-600 dark:text-gray-400';
                                    return (
                                        <span key={index} className={`${color} whitespace-pre-wrap block`}>
                                            {part.value}
                                        </span>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
