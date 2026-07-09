'use client';

import React, { useState, useCallback } from 'react';
import { Target } from 'lucide-react';

interface Labels {
    title: string; description: string; current_price: string;
    per_section: string; eps: string; target_per: string;
    pbr_section: string; bps: string; target_pbr: string;
    ev_section: string; ebitda_per_share: string; net_debt_per_share: string; target_ev_ebitda: string;
    calculate: string; fair_value_per: string; fair_value_pbr: string; fair_value_ev: string;
    average_fair_value: string; upside: string; downside: string; current_per: string; current_pbr: string;
    overvalued: string; undervalued: string; fairly_valued: string; disclaimer: string;
}

interface ValuationResult {
    fairPER: number; fairPBR: number; fairEV: number; average: number;
    upsidePct: number; currentPER: number; currentPBR: number; verdict: string;
}

export default function StockValuationClient({ labels }: { labels: Labels }) {
    const [currentPrice, setCurrentPrice] = useState(80000);
    const [eps, setEps] = useState(5000);
    const [targetPER, setTargetPER] = useState(15);
    const [bps, setBps] = useState(60000);
    const [targetPBR, setTargetPBR] = useState(1.5);
    const [ebitdaPS, setEbitdaPS] = useState(12000);
    const [netDebtPS, setNetDebtPS] = useState(5000);
    const [targetEV, setTargetEV] = useState(8);
    const [result, setResult] = useState<ValuationResult | null>(null);

    const calculate = useCallback(() => {
        const fairPER = eps * targetPER;
        const fairPBR = bps * targetPBR;
        const fairEV = ebitdaPS * targetEV - netDebtPS;
        const average = (fairPER + fairPBR + fairEV) / 3;
        const upsidePct = ((average - currentPrice) / currentPrice) * 100;
        const currentPER = currentPrice / eps;
        const currentPBR = currentPrice / bps;
        const absUpside = Math.abs(upsidePct);
        const verdict = absUpside < 5 ? labels.fairly_valued : upsidePct > 0 ? labels.undervalued : labels.overvalued;
        setResult({ fairPER, fairPBR, fairEV, average, upsidePct, currentPER, currentPBR, verdict });
    }, [currentPrice, eps, targetPER, bps, targetPBR, ebitdaPS, netDebtPS, targetEV, labels]);

    const fmt = (v: number) => new Intl.NumberFormat('ko-KR').format(Math.round(v));
    const inputCls = "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm";

    const verdictColor = result
        ? result.verdict === labels.undervalued ? 'text-blue-600 dark:text-blue-400'
        : result.verdict === labels.overvalued ? 'text-red-600 dark:text-red-400'
        : 'text-emerald-600 dark:text-emerald-400'
        : '';

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/30 mb-4">
                    <Target className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                    {/* Current Price */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{labels.current_price}</label>
                        <input type="number" value={currentPrice} onChange={e => setCurrentPrice(Number(e.target.value))} className={inputCls} />
                    </div>

                    {/* PER */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-5 border border-blue-100 dark:border-blue-900">
                        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3">{labels.per_section}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.eps}</label>
                                <input type="number" value={eps} onChange={e => setEps(Number(e.target.value))} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.target_per}</label>
                                <input type="number" step="0.5" value={targetPER} onChange={e => setTargetPER(Number(e.target.value))} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {/* PBR */}
                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-5 border border-purple-100 dark:border-purple-900">
                        <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-3">{labels.pbr_section}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.bps}</label>
                                <input type="number" value={bps} onChange={e => setBps(Number(e.target.value))} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.target_pbr}</label>
                                <input type="number" step="0.1" value={targetPBR} onChange={e => setTargetPBR(Number(e.target.value))} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {/* EV/EBITDA */}
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900">
                        <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-3">{labels.ev_section}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.ebitda_per_share}</label>
                                <input type="number" value={ebitdaPS} onChange={e => setEbitdaPS(Number(e.target.value))} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.net_debt_per_share}</label>
                                <input type="number" value={netDebtPS} onChange={e => setNetDebtPS(Number(e.target.value))} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labels.target_ev_ebitda}</label>
                                <input type="number" step="0.5" value={targetEV} onChange={e => setTargetEV(Number(e.target.value))} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculate} className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors shadow-lg shadow-teal-500/20">
                        {labels.calculate}
                    </button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {result ? (
                        <>
                            {/* Verdict */}
                            <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 text-center ${result.upsidePct > 5 ? 'border-blue-300 dark:border-blue-700' : result.upsidePct < -5 ? 'border-red-300 dark:border-red-700' : 'border-emerald-300 dark:border-emerald-700'}`}>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{labels.average_fair_value}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₩{fmt(result.average)}</p>
                                <p className={`text-xl font-semibold ${verdictColor}`}>
                                    {result.upsidePct >= 0 ? `▲ +${result.upsidePct.toFixed(1)}%` : `▼ ${result.upsidePct.toFixed(1)}%`}
                                    <span className="ml-2">{result.verdict}</span>
                                </p>
                            </div>

                            {/* Individual Fair Values */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: labels.fair_value_per, value: result.fairPER, color: 'blue' },
                                    { label: labels.fair_value_pbr, value: result.fairPBR, color: 'purple' },
                                    { label: labels.fair_value_ev, value: result.fairEV, color: 'emerald' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/20 p-4 rounded-xl border border-${color}-100 dark:border-${color}-800 text-center`}>
                                        <p className={`text-xs font-medium text-${color}-700 dark:text-${color}-300 mb-1`}>{label}</p>
                                        <p className={`text-base font-bold text-${color}-900 dark:text-${color}-100`}>₩{fmt(value)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Current Ratios */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
                                {[
                                    { label: labels.current_per, value: result.currentPER.toFixed(1) + 'x' },
                                    { label: labels.current_pbr, value: result.currentPBR.toFixed(2) + 'x' },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">{labels.disclaimer}</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-80 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                            <Target className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">데이터를 입력하고 계산하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
