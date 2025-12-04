'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Copy, Check, ArrowRight, ArrowDown } from 'lucide-react';

interface UnixTimestampClientProps {
    labels: {
        title: string;
        description: string;
        current_time: string;
        pause: string;
        resume: string;
        convert_to_date: string;
        convert_to_timestamp: string;
        timestamp_input: string;
        date_input: string;
        gmt: string;
        local: string;
        copy: string;
        copied: string;
    };
}

export default function UnixTimestampClient({ labels }: UnixTimestampClientProps) {
    // Current Time State
    const [currentTime, setCurrentTime] = useState<number>(Math.floor(Date.now() / 1000));
    const [isPaused, setIsPaused] = useState(false);

    // Converter 1: Timestamp -> Date
    const [inputTimestamp, setInputTimestamp] = useState('');
    const [convertedDate, setConvertedDate] = useState<{ gmt: string; local: string } | null>(null);

    // Converter 2: Date -> Timestamp
    const [inputDate, setInputDate] = useState('');
    const [convertedTimestamp, setConvertedTimestamp] = useState<number | null>(null);

    // Copy Feedback
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Timer for Current Time
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Handle Timestamp Input Change
    const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputTimestamp(val);

        if (!val) {
            setConvertedDate(null);
            return;
        }

        const num = parseInt(val, 10);
        if (isNaN(num)) {
            setConvertedDate(null);
            return;
        }

        // Auto-detect seconds vs ms
        // If length > 11, assume ms. Otherwise seconds.
        const date = new Date(val.length > 11 ? num : num * 1000);

        if (date.toString() === 'Invalid Date') {
            setConvertedDate(null);
            return;
        }

        setConvertedDate({
            gmt: date.toUTCString(),
            local: date.toLocaleString(),
        });
    };

    // Handle Date Input Change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputDate(val);

        if (!val) {
            setConvertedTimestamp(null);
            return;
        }

        const date = new Date(val);
        if (date.toString() === 'Invalid Date') {
            setConvertedTimestamp(null);
            return;
        }

        setConvertedTimestamp(Math.floor(date.getTime() / 1000));
    };

    // Copy Helper
    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-12">
            {/* Top: Current Unix Time */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <h2 className="text-gray-500 dark:text-gray-400 font-medium mb-4 uppercase tracking-wider text-sm">
                    {labels.current_time}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="text-5xl md:text-7xl font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums tracking-tight">
                        {currentTime}
                    </div>
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isPaused
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                        {isPaused ? labels.resume : labels.pause}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Converter 1: Timestamp -> Date */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">1</span>
                        {labels.convert_to_date}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.timestamp_input}
                            </label>
                            <input
                                type="number"
                                value={inputTimestamp}
                                onChange={handleTimestampChange}
                                placeholder={currentTime.toString()}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex justify-center text-gray-400">
                            <ArrowDown size={24} />
                        </div>

                        <div className="space-y-4">
                            {/* GMT Result */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-gray-500 uppercase">{labels.gmt}</span>
                                    <button
                                        onClick={() => convertedDate && copyToClipboard(convertedDate.gmt, 'gmt')}
                                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                                        disabled={!convertedDate}
                                    >
                                        {copiedId === 'gmt' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                                    {convertedDate ? convertedDate.gmt : '-'}
                                </div>
                            </div>

                            {/* Local Result */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">{labels.local}</span>
                                    <button
                                        onClick={() => convertedDate && copyToClipboard(convertedDate.local, 'local')}
                                        className="text-indigo-400 hover:text-indigo-600 transition-colors"
                                        disabled={!convertedDate}
                                    >
                                        {copiedId === 'local' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                                    {convertedDate ? convertedDate.local : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Converter 2: Date -> Timestamp */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">2</span>
                        {labels.convert_to_timestamp}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.date_input}
                            </label>
                            <input
                                type="datetime-local"
                                value={inputDate}
                                onChange={handleDateChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex justify-center text-gray-400">
                            <ArrowDown size={24} />
                        </div>

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 text-center">
                            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase mb-2">Unix Timestamp</div>
                            <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-4 tabular-nums break-all">
                                {convertedTimestamp !== null ? convertedTimestamp : '-'}
                            </div>
                            <button
                                onClick={() => convertedTimestamp && copyToClipboard(convertedTimestamp.toString(), 'ts')}
                                disabled={convertedTimestamp === null}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {copiedId === 'ts' ? <Check size={16} /> : <Copy size={16} />}
                                {copiedId === 'ts' ? labels.copied : labels.copy}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
