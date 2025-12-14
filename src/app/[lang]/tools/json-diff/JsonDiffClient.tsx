'use client';

import React, { useState, useEffect } from 'react';
import { FileDiff, AlertCircle, ArrowRight } from 'lucide-react';
import { diffJson, Change } from 'diff';

import JSON5 from 'json5';

interface JsonDiffClientProps {
    labels: {
        title: string;
        description: string;
        original_label: string;
        modified_label: string;
        compare_button: string;
        result_label: string;
        error_invalid_json: string;
        no_diff: string;
    };
}

export default function JsonDiffClient({ labels }: JsonDiffClientProps) {
    const [leftJson, setLeftJson] = useState('');
    const [rightJson, setRightJson] = useState('');
    const [diffResult, setDiffResult] = useState<Change[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = () => {
        setError(null);
        try {
            const leftObj = leftJson ? JSON5.parse(leftJson) : {};
            const rightObj = rightJson ? JSON5.parse(rightJson) : {};

            const diff = diffJson(leftObj, rightObj);
            setDiffResult(diff);
        } catch (e) {
            setError(labels.error_invalid_json);
            setDiffResult(null);
        }
    };

    // Auto-format JSON on blur
    const formatJson = (json: string, setJson: (val: string) => void) => {
        try {
            if (!json.trim()) return;
            const obj = JSON5.parse(json);
            setJson(JSON.stringify(obj, null, 2));
            setError(null);
        } catch (e) {
            // Ignore format errors on blur, just let user keep editing
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <FileDiff className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Original JSON Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {labels.original_label}
                    </label>
                    <div className="relative h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <textarea
                            value={leftJson}
                            onChange={(e) => setLeftJson(e.target.value)}
                            onBlur={() => formatJson(leftJson, setLeftJson)}
                            className="w-full h-full p-4 bg-transparent border-none resize-none focus:ring-0 font-mono text-sm text-gray-900 dark:text-gray-100"
                            spellCheck={false}
                            placeholder="{ ... }"
                        />
                    </div>
                </div>

                {/* Modified JSON Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {labels.modified_label}
                    </label>
                    <div className="relative h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <textarea
                            value={rightJson}
                            onChange={(e) => setRightJson(e.target.value)}
                            onBlur={() => formatJson(rightJson, setRightJson)}
                            className="w-full h-full p-4 bg-transparent border-none resize-none focus:ring-0 font-mono text-sm text-gray-900 dark:text-gray-100"
                            spellCheck={false}
                            placeholder="{ ... }"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-10">
                <button
                    onClick={handleCompare}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                    {labels.compare_button}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {error && (
                <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Diff Result */}
            {diffResult && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                            {labels.result_label}
                        </h3>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="font-mono text-sm leading-relaxed">
                            {diffResult.map((part, index) => {
                                const color = part.added
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                    : part.removed
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                        : 'text-gray-600 dark:text-gray-400';

                                return (
                                    <span key={index} className={`${color} px-0.5 rounded`}>
                                        {part.value}
                                    </span>
                                );
                            })}
                        </pre>
                        {diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed && (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                {labels.no_diff}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
