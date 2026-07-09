'use client';

import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';

interface Labels {
    title: string; description: string; mode: string; mode_cagr: string; mode_future: string;
    mode_period: string; initial_value: string; final_value: string; period_years: string;
    cagr_rate: string; calculate: string; result_cagr: string; result_future: string;
    result_period: string; result_total_return: string; result_total_gain: string;
    chart_title: string; year_label: string; value_label: string;
}

type Mode = 'cagr' | 'future' | 'period';

export default function CagrCalculatorClient({ labels }: { labels: Labels }) {
    const [mode, setMode] = useState<Mode>('cagr');
    const [initialValue, setInitialValue] = useState(10000000);
    const [finalValue, setFinalValue] = useState(20000000);
    const [years, setYears] = useState(5);
    const [cagrRate, setCagrRate] = useState(10);
    const [result, setResult] = useState<{ value: number; totalReturn: number; totalGain: number; yearData: { year: number; value: number }[] } | null>(null);

    const calculate = useCallback(() => {
        let value: number, totalReturn: number, totalGain: number;
        let yearData: { year: number; value: number }[] = [];

        if (mode === 'cagr') {
            value = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
            const cagr = value / 100;
            yearData = Array.from({ length: years + 1 }, (_, i) => ({ year: i, value: initialValue * Math.pow(1 + cagr, i) }));
            totalReturn = (finalValue / initialValue - 1) * 100;
            totalGain = finalValue - initialValue;
        } else if (mode === 'future') {
            const cagr = cagrRate / 100;
            value = initialValue * Math.pow(1 + cagr, years);
            yearData = Array.from({ length: years + 1 }, (_, i) => ({ year: i, value: initialValue * Math.pow(1 + cagr, i) }));
            totalReturn = (value / initialValue - 1) * 100;
            totalGain = value - initialValue;
        } else {
            const cagr = cagrRate / 100;
            value = Math.log(finalValue / initialValue) / Math.log(1 + cagr);
            const roundedYears = Math.ceil(value);
            yearData = Array.from({ length: roundedYears + 1 }, (_, i) => ({ year: i, value: initialValue * Math.pow(1 + cagr, i) }));
            totalReturn = (finalValue / initialValue - 1) * 100;
            totalGain = finalValue - initialValue;
        }

        setResult({ value, totalReturn, totalGain, yearData });
    }, [mode, initialValue, finalValue, years, cagrRate]);

    const fmt = (v: number) => new Intl.NumberFormat('ko-KR').format(Math.round(v));
    const inputCls = "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent";

    // Simple bar chart using CSS
    const maxVal = result ? Math.max(...result.yearData.map(d => d.value)) : 1;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            {/* Mode Tabs */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
                {([['cagr', labels.mode_cagr], ['future', labels.mode_future], ['period', labels.mode_period]] as [Mode, string][]).map(([m, label]) => (
                    <button key={m} onClick={() => setMode(m)} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === m ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                        {label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.initial_value}</label>
                        <input type="number" value={initialValue} onChange={e => setInitialValue(Number(e.target.value))} className={inputCls} />
                    </div>
                    {(mode === 'cagr' || mode === 'period') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.final_value}</label>
                            <input type="number" value={finalValue} onChange={e => setFinalValue(Number(e.target.value))} className={inputCls} />
                        </div>
                    )}
                    {(mode === 'cagr' || mode === 'future') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.period_years}</label>
                            <input type="number" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className={inputCls} />
                        </div>
                    )}
                    {(mode === 'future' || mode === 'period') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.cagr_rate}</label>
                            <input type="number" step="0.1" value={cagrRate} onChange={e => setCagrRate(Number(e.target.value))} className={inputCls} />
                        </div>
                    )}
                    <button onClick={calculate} className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg shadow-green-500/20">
                        {labels.calculate}
                    </button>

                    {result && (
                        <div className="space-y-3 pt-2">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
                                <p className="text-sm text-green-700 dark:text-green-300 mb-1">{mode === 'cagr' ? labels.result_cagr : mode === 'future' ? labels.result_future : labels.result_period}</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                    {mode === 'cagr' ? `${result.value.toFixed(3)}%` : mode === 'future' ? `₩${fmt(result.value)}` : `${result.value.toFixed(1)}년`}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{labels.result_total_return}</p>
                                    <p className="font-bold text-gray-900 dark:text-white">{result.totalReturn.toFixed(1)}%</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{labels.result_total_gain}</p>
                                    <p className="font-bold text-gray-900 dark:text-white">₩{fmt(result.totalGain)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{labels.chart_title}</h3>
                    {result ? (
                        <div className="flex items-end gap-1 h-52">
                            {result.yearData.slice(0, 31).map(d => (
                                <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full bg-green-500 dark:bg-green-400 rounded-t-sm hover:bg-green-600 dark:hover:bg-green-300 transition-colors"
                                        style={{ height: `${(d.value / maxVal) * 100}%` }}
                                        title={`${d.year}년: ₩${fmt(d.value)}`}
                                    />
                                    {(d.year === 0 || d.year % 5 === 0) && (
                                        <span className="text-xs text-gray-400 truncate w-full text-center">{d.year}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-52 text-gray-400 dark:text-gray-600">
                            <p className="text-sm">계산 결과가 여기에 표시됩니다</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
