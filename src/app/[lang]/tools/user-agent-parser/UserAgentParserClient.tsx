'use client';

import React, { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

interface Props {
    labels: {
        placeholder: string;
        analyze: string;
        browser: string;
        os: string;
        device: string;
        cpu: string;
        engine: string;
        my_ua: string;
    };
}

export default function UserAgentParserClient({ labels }: Props) {
    const [inputUa, setInputUa] = useState('');
    const [result, setResult] = useState<UAParser.IResult | null>(null);

    useEffect(() => {
        // Auto-detect on load
        try {
            const parser = new UAParser();
            setResult(parser.getResult());
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleAnalyze = () => {
        let parser;
        if (!inputUa.trim()) {
            // If empty, parse current browser
            parser = new UAParser();
        } else {
            parser = new UAParser(inputUa);
        }
        setResult(parser.getResult());
    };

    const handleReset = () => {
        const parser = new UAParser();
        setResult(parser.getResult());
        setInputUa('');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3">
                <textarea
                    className="w-full p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder={labels.placeholder}
                    value={inputUa}
                    onChange={(e) => setInputUa(e.target.value)}
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleAnalyze}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        {labels.analyze}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        {labels.my_ua}
                    </button>
                </div>
            </div>

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title={labels.browser} value={`${result.browser.name || 'Unknown'} ${result.browser.version || ''}`} icon="🌐" />
                    <Card title={labels.os} value={`${result.os.name || 'Unknown'} ${result.os.version || ''}`} icon="💻" />
                    <Card title={labels.device} value={`${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type || 'Desktop'})`} icon="📱" />
                    <Card title={labels.cpu} value={result.cpu.architecture || 'Unknown'} icon="⚙️" />
                    <Card title={labels.engine} value={`${result.engine.name || 'Unknown'} ${result.engine.version || ''}`} icon="🔧" />
                    <Card title="UA String" value={result.ua} icon="📄" fullWidth />
                </div>
            )}
        </div>
    );
}

function Card({ title, value, icon, fullWidth }: { title: string, value: string, icon: string, fullWidth?: boolean }) {
    return (
        <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 flex flex-col gap-2 ${fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-medium">{title}</span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-white break-all">
                {value && value.trim() !== '' ? value : 'Unknown'}
            </div>
        </div>
    );
}
