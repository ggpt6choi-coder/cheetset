'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

interface RoiCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        invested_amount: string;
        amount_returned: string;
        investment_duration: string;
        calculate: string;
        roi_result: string;
        annualized_roi: string;
        total_profit: string;
        years: string;
        months: string;
        days: string;
        invested: string;
        returned: string;
    };
    lang: string;
}

export default function RoiCalculatorClient({ labels, lang }: RoiCalculatorClientProps) {
    const [invested, setInvested] = useState<string>('');
    const [returned, setReturned] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [durationUnit, setDurationUnit] = useState<'years' | 'months' | 'days'>('years');

    const [result, setResult] = useState<{
        roi: number;
        totalProfit: number;
        annualizedRoi: number | null;
    } | null>(null);

    const calculateROI = () => {
        const inv = parseFloat(invested);
        const ret = parseFloat(returned);
        const dur = parseFloat(duration);

        if (isNaN(inv) || isNaN(ret) || inv === 0) {
            return;
        }

        const profit = ret - inv;
        const roi = (profit / inv) * 100;

        let annualizedRoi = null;
        if (!isNaN(dur) && dur > 0) {
            let years = dur;
            if (durationUnit === 'months') years = dur / 12;
            if (durationUnit === 'days') years = dur / 365;

            // CAGR formula: (Ending Value / Beginning Value) ^ (1 / n) - 1
            annualizedRoi = (Math.pow(ret / inv, 1 / years) - 1) * 100;
        }

        setResult({
            roi,
            totalProfit: profit,
            annualizedRoi,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US', {
            style: 'currency',
            currency: lang === 'ko' ? 'KRW' : lang === 'ja' ? 'JPY' : 'USD',
            maximumFractionDigits: 2,
        }).format(value);
    };

    const getCurrencySymbol = () => {
        switch (lang) {
            case 'ko': return '₩';
            case 'ja': return '¥';
            default: return '$';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {labels.invested_amount}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 font-bold text-lg">{getCurrencySymbol()}</span>
                        </div>
                        <input
                            type="number"
                            value={invested}
                            onChange={(e) => setInvested(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {labels.amount_returned}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 font-bold text-lg">{getCurrencySymbol()}</span>
                        </div>
                        <input
                            type="number"
                            value={returned}
                            onChange={(e) => setReturned(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {labels.investment_duration}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="0"
                        />
                        <select
                            value={durationUnit}
                            onChange={(e) => setDurationUnit(e.target.value as any)}
                            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                            <option value="years">{labels.years}</option>
                            <option value="months">{labels.months}</option>
                            <option value="days">{labels.days}</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculateROI}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <Calculator size={20} />
                    {labels.calculate}
                </button>
            </div>

            {/* Result Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                {result ? (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                {labels.roi_result}
                            </div>
                            <div className={`text-5xl md:text-6xl font-bold tabular-nums tracking-tight ${result.roi >= 0 ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(2)}%
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-center">
                                <div className="text-xs font-medium text-gray-500 mb-1">{labels.total_profit}</div>
                                <div className={`text-lg font-bold ${result.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {formatCurrency(result.totalProfit)}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-center">
                                <div className="text-xs font-medium text-gray-500 mb-1">{labels.annualized_roi}</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {result.annualizedRoi !== null ? `${result.annualizedRoi.toFixed(2)}%` : '-'}
                                </div>
                            </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-gray-500">
                                <span>{labels.invested}</span>
                                <span>{labels.returned}</span>
                            </div>
                            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
                                <div
                                    className="h-full bg-gray-400 dark:bg-gray-500"
                                    style={{ width: '50%' }} // Base reference
                                />
                                <div
                                    className={`h-full ${result.totalProfit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{
                                        width: `${Math.min(Math.abs(result.roi) / 2, 50)}%`, // Scale visually
                                        marginLeft: result.totalProfit < 0 ? `-${Math.min(Math.abs(result.roi) / 2, 50)}%` : '0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-12">
                        <TrendingUp size={48} className="mx-auto mb-4 opacity-20" />
                        <p>{labels.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
