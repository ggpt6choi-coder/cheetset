'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ServerTimeClient() {
    const [url, setUrl] = useState('');
    const [serverTime, setServerTime] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeDiff, setTimeDiff] = useState<number | null>(null);
    const [displayUrl, setDisplayUrl] = useState<string>('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchServerTime = async () => {
        if (!url) return;

        setLoading(true);
        setError(null);
        setServerTime(null);
        setTimeDiff(null);
        setDisplayUrl('');

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        try {
            const res = await fetch(`/api/server-time?url=${encodeURIComponent(url)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch server time');
            }

            const fetchedTime = new Date(data.serverTime);
            const now = new Date();
            const diff = fetchedTime.getTime() - now.getTime();

            setServerTime(fetchedTime);
            setTimeDiff(diff);
            setDisplayUrl(data.url);

            // Start the clock
            timerRef.current = setInterval(() => {
                setServerTime(prev => {
                    if (!prev) return null;
                    return new Date(prev.getTime() + 1000); // Add 1 second
                });
            }, 1000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            fetchServerTime();
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold mb-2 flex items-center justify-center gap-2 text-black dark:text-white">
                    <Clock className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
                    서버 시간 확인
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    원하는 사이트의 정확한 서버 시간을 확인하세요.
                    <br />
                    티켓팅, 수강신청 등 1초가 중요한 순간에 도움이 됩니다.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="URL을 입력하세요 (예: www.naver.com)"
                            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-gray-700"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    </div>
                    <button
                        onClick={fetchServerTime}
                        disabled={loading || !url}
                        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors min-w-[100px] dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:disabled:bg-gray-700"
                    >
                        {loading ? '확인 중...' : '확인'}
                    </button>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                {serverTime && (
                    <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {displayUrl && (
                            <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 bg-indigo-50 dark:bg-indigo-900/30 inline-block px-3 py-1 rounded-full text-sm">
                                {displayUrl}
                            </div>
                        )}
                        <div className="text-gray-500 dark:text-gray-400 mb-2 font-medium">
                            {formatDate(serverTime)}
                        </div>
                        <div className="text-6xl font-black text-gray-900 dark:text-white tracking-tight font-mono mb-4">
                            {formatTime(serverTime)}
                        </div>

                        {timeDiff !== null && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                <span>
                                    내 컴퓨터 시간보다{' '}
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        {Math.abs(timeDiff / 1000).toFixed(1)}초
                                    </span>{' '}
                                    {timeDiff > 0 ? '빠릅니다' : '느립니다'}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 text-sm text-indigo-800 dark:text-indigo-200">
                <h3 className="font-bold mb-2 text-lg">💡 이용 팁</h3>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>네이비즘(Navyism)과 같은 원리로 작동합니다.</li>
                    <li>서버의 Date 헤더 정보를 기반으로 시간을 계산합니다.</li>
                    <li>네트워크 지연 시간에 따라 약간의 오차가 발생할 수 있습니다.</li>
                    <li>새로고침 없이 실시간으로 흐르는 시간을 확인할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
}
