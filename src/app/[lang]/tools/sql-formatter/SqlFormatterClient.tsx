'use client';

import { useState } from 'react';
import { format } from 'sql-formatter';
import { Copy, Check, Trash2, Code2 } from 'lucide-react';

interface SqlFormatterClientProps {
    labels: {
        title: string;
        description: string;
        placeholder: string;
        format: string;
        copy: string;
        clear: string;
        copied: string;
        dialect: string;
        tab_width: string;
    };
}

const DIALECTS = [
    { value: 'sql', label: 'Standard SQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'mariadb', label: 'MariaDB' },
    { value: 'transactsql', label: 'Transact-SQL (SQL Server)' },
    { value: 'plsql', label: 'PL/SQL (Oracle)' },
    { value: 'bigquery', label: 'BigQuery' },
    { value: 'snowflake', label: 'Snowflake' },
];

export default function SqlFormatterClient({ labels }: SqlFormatterClientProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [dialect, setDialect] = useState('sql');
    const [tabWidth, setTabWidth] = useState(2);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormat = () => {
        if (!input.trim()) return;
        setError(null);
        try {
            const formatted = format(input, {
                language: dialect as any,
                tabWidth: tabWidth,
                keywordCase: 'upper',
            });
            setOutput(formatted);
        } catch (err) {
            console.error(err);
            setError('Error formatting SQL. Please check your syntax.');
        }
    };

    const handleCopy = async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
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
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {labels.dialect}
                            </label>
                            <select
                                value={dialect}
                                onChange={(e) => setDialect(e.target.value)}
                                className="block w-40 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                {DIALECTS.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {labels.tab_width}
                            </label>
                            <select
                                value={tabWidth}
                                onChange={(e) => setTabWidth(Number(e.target.value))}
                                className="block w-20 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                            </select>
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
                            onClick={handleFormat}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Code2 className="w-4 h-4 mr-2" />
                            {labels.format}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700 h-[600px]">
                    {/* Input */}
                    <div className="flex flex-col h-full">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={labels.placeholder}
                            className="flex-1 w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 border-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 relative">
                        {output ? (
                            <>
                                <pre className="flex-1 w-full p-4 overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                    {output}
                                </pre>
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    title={labels.copy}
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
                                {error ? (
                                    <span className="text-red-500">{error}</span>
                                ) : (
                                    labels.format + '...'
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
