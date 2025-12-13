'use client';

import React, { useState, useMemo } from 'react';
import { Code2, AlertCircle, Check } from 'lucide-react';

interface RegexTesterClientProps {
    labels: {
        title: string;
        description: string;
        input_label: string;
        text_label: string;
        flags_label: string;
        cheatsheet_label: string;
        no_match: string;
        match_found: string;
        matches_found: string;
        cheatsheet: {
            email: string;
            url: string;
            phone: string;
            date: string;
            ipv4: string;
            hex: string;
        };
    };
}

export default function RegexTesterClient({ labels }: RegexTesterClientProps) {
    const [regex, setRegex] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const backdropRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (textareaRef.current && backdropRef.current) {
            backdropRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const { matches, error } = useMemo(() => {
        if (!regex) return { matches: [], error: null };
        try {
            const re = new RegExp(regex, flags);
            const matches = [];
            let match;

            // Prevent infinite loops with empty matches
            if (regex === '') return { matches: [], error: null };

            // For global flag, iterate through matches
            if (flags.includes('g')) {
                while ((match = re.exec(testString)) !== null) {
                    matches.push({
                        index: match.index,
                        length: match[0].length,
                        text: match[0]
                    });
                    if (match.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                }
            } else {
                // Non-global flag
                match = re.exec(testString);
                if (match) {
                    matches.push({
                        index: match.index,
                        length: match[0].length,
                        text: match[0]
                    });
                }
            }
            return { matches, error: null };
        } catch (e) {
            return { matches: [], error: (e as Error).message };
        }
    }, [regex, flags, testString]);

    const handleCheatsheetClick = (pattern: string) => {
        setRegex(pattern);
    };

    const renderHighlightedText = () => {
        if (!testString) return null;
        if (matches.length === 0) return testString;

        let lastIndex = 0;
        const elements = [];

        matches.forEach((match, i) => {
            // Text before match
            if (match.index > lastIndex) {
                elements.push(
                    <span key={`text-${i}`}>
                        {testString.slice(lastIndex, match.index)}
                    </span>
                );
            }
            // Match
            elements.push(
                <span
                    key={`match-${i}`}
                    className="bg-yellow-200 dark:bg-yellow-900/50 text-gray-900 dark:text-gray-100 rounded px-0.5"
                >
                    {testString.slice(match.index, match.index + match.length)}
                </span>
            );
            lastIndex = match.index + match.length;
        });

        // Remaining text
        if (lastIndex < testString.length) {
            elements.push(
                <span key="text-end">
                    {testString.slice(lastIndex)}
                </span>
            );
        }

        return elements;
    };

    const cheatsheetItems = [
        { label: labels.cheatsheet.email, pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
        { label: labels.cheatsheet.url, pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
        { label: labels.cheatsheet.phone, pattern: '\\d{3}-\\d{3,4}-\\d{4}' },
        { label: labels.cheatsheet.date, pattern: '\\d{4}-\\d{2}-\\d{2}' },
        { label: labels.cheatsheet.ipv4, pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
        { label: labels.cheatsheet.hex, pattern: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})' },
    ];

    const toggleFlag = (flag: string) => {
        setFlags(prev =>
            prev.includes(flag)
                ? prev.replace(flag, '')
                : prev + flag
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tester Section (Left 2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Regex Input */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {labels.input_label}
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{labels.flags_label}:</span>
                                    {['g', 'i', 'm'].map(flag => (
                                        <button
                                            key={flag}
                                            onClick={() => toggleFlag(flag)}
                                            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${flags.includes(flag)
                                                ? 'bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400'
                                                : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                                }`}
                                        >
                                            {flag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 font-mono">/</span>
                                </div>
                                <input
                                    type="text"
                                    value={regex}
                                    onChange={(e) => setRegex(e.target.value)}
                                    className="block w-full pl-6 pr-12 py-3 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white font-mono"
                                    placeholder="regex..."
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 font-mono">/{flags}</span>
                                </div>
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Test String Input */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[400px]">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {labels.text_label}
                            </label>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {matches.length > 0 ? (
                                    <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        {matches.length} {labels.matches_found}
                                    </span>
                                ) : (
                                    labels.no_match
                                )}
                            </div>
                        </div>
                        <div className="relative flex-1">
                            {/* Backdrop for highlighting */}
                            <div
                                ref={backdropRef}
                                className="absolute inset-0 p-4 font-mono text-sm whitespace-pre-wrap break-words pointer-events-none text-gray-900 dark:text-gray-100 z-10 overflow-auto"
                            >
                                {renderHighlightedText()}
                            </div>
                            {/* Actual Textarea */}
                            <textarea
                                ref={textareaRef}
                                value={testString}
                                onChange={(e) => setTestString(e.target.value)}
                                onScroll={handleScroll}
                                className="absolute inset-0 w-full h-full p-4 bg-transparent border-none resize-none focus:ring-0 font-mono text-sm text-transparent caret-gray-900 dark:caret-white z-20"
                                spellCheck={false}
                                placeholder="Paste your text here..."
                            />
                        </div>
                    </div>
                </div>

                {/* Cheat Sheet Sidebar (Right 1/3) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {labels.cheatsheet_label}
                        </h3>
                        <div className="space-y-2">
                            {cheatsheetItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCheatsheetClick(item.pattern)}
                                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                        {item.label}
                                    </div>
                                    <code className="text-xs text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                                        {item.pattern}
                                    </code>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
