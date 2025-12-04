'use client';

import React, { useState, useEffect } from 'react';
import { Video, TrendingUp, DollarSign, Info } from 'lucide-react';

interface YoutubeCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        daily_views: string;
        rpm: string;
        estimated_earnings: string;
        daily: string;
        monthly: string;
        yearly: string;
        disclaimer: string;
    };
    lang: string;
}

export default function YoutubeCalculatorClient({ labels, lang }: YoutubeCalculatorClientProps) {
    const [dailyViews, setDailyViews] = useState<number>(10000);
    const [rpm, setRpm] = useState<number>(2.00);
    const [earnings, setEarnings] = useState({
        daily: 0,
        monthly: 0,
        yearly: 0
    });

    useEffect(() => {
        const daily = (dailyViews / 1000) * rpm;
        const monthly = daily * 30;
        const yearly = daily * 365;

        setEarnings({
            daily,
            monthly,
            yearly
        });
    }, [dailyViews, rpm]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US', {
            style: 'currency',
            currency: lang === 'ko' ? 'KRW' : lang === 'ja' ? 'JPY' : 'USD',
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US').format(value);
    };

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-8">
                {/* Daily Views Slider */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Video size={18} className="text-red-500" />
                            {labels.daily_views}
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {formatNumber(dailyViews)}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="1000"
                        value={dailyViews}
                        onChange={(e) => setDailyViews(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>0</span>
                        <span>1M+</span>
                    </div>
                </div>

                {/* RPM Slider */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <DollarSign size={18} className="text-green-500" />
                            {labels.rpm}
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono font-bold text-green-600 dark:text-green-400">
                            ${rpm.toFixed(2)}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0.25"
                        max="10.00"
                        step="0.05"
                        value={rpm}
                        onChange={(e) => setRpm(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>$0.25</span>
                        <span>$10.00</span>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start">
                    <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        {labels.disclaimer}
                    </p>
                </div>
            </div>

            {/* Result Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center space-y-6">
                <div className="text-center mb-4">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm mb-2">
                        {labels.estimated_earnings}
                    </h3>
                </div>

                <div className="space-y-4">
                    {/* Daily */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{labels.daily}</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                            {formatCurrency(earnings.daily)}
                        </span>
                    </div>

                    {/* Monthly */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl flex justify-between items-center border border-indigo-100 dark:border-indigo-800">
                        <span className="text-indigo-700 dark:text-indigo-300 font-medium">{labels.monthly}</span>
                        <span className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">
                            {formatCurrency(earnings.monthly)}
                        </span>
                    </div>

                    {/* Yearly */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{labels.yearly}</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                            {formatCurrency(earnings.yearly)}
                        </span>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <TrendingUp className="mx-auto text-gray-300 dark:text-gray-600" size={48} />
                </div>
            </div>
        </div>
    );
}
