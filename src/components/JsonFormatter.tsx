"use client";

import { useState } from "react";

type JsonFormatterProps = {
    labels: {
        placeholder: string;
        format: string;
        minify: string;
        copy: string;
        clear: string;
        error: string;
        copied: string;
    };
};

export default function JsonFormatter({ labels }: JsonFormatterProps) {
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (e) {
            setError(labels.error);
        }
    };

    const handleMinify = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (e) {
            setError(labels.error);
        }
    };

    const handleCopy = async () => {
        if (!input) return;
        try {
            await navigator.clipboard.writeText(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const handleClear = () => {
        setInput("");
        setError(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={handleFormat}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                        {labels.format}
                    </button>
                    <button
                        onClick={handleMinify}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium"
                    >
                        {labels.minify}
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded transition-colors font-medium ${copied
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                    >
                        {copied ? labels.copied : labels.copy}
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium ml-auto"
                    >
                        {labels.clear}
                    </button>
                </div>

                <div className="relative">
                    <textarea
                        className={`w-full h-96 p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700"
                            }`}
                        placeholder={labels.placeholder}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError(null);
                        }}
                        spellCheck={false}
                    />
                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-200 px-4 py-2 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
