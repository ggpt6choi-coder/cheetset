'use client';

import React, { useState, useCallback } from 'react';
import { BarChart2 } from 'lucide-react';

interface Labels {
    title: string; description: string; stock_price: string; strike_price: string;
    time_to_expiry: string; risk_free_rate: string; volatility: string; dividend_yield: string;
    calculate: string; call_price: string; put_price: string; greeks_title: string;
    delta: string; gamma: string; theta: string; vega: string; rho: string;
    intrinsic_value: string; time_value: string; call_label: string; put_label: string; days_to_expiry: string;
}

// Standard Normal CDF using Horner's method approximation
function normCDF(x: number): number {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1.0 + sign * y);
}

function normPDF(x: number): number {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

interface BSResult {
    d1: number; d2: number; callPrice: number; putPrice: number;
    callDelta: number; putDelta: number; gamma: number;
    callTheta: number; putTheta: number; vega: number;
    callRho: number; putRho: number;
    callIntrinsic: number; callTimeValue: number;
    putIntrinsic: number; putTimeValue: number;
}

export default function BlackScholesClient({ labels }: { labels: Labels }) {
    const [S, setS] = useState(100);
    const [K, setK] = useState(100);
    const [T, setT] = useState(0.25);
    const [r, setR] = useState(3.0);
    const [sigma, setSigma] = useState(20.0);
    const [q, setQ] = useState(0.0);
    const [result, setResult] = useState<BSResult | null>(null);

    const calculate = useCallback(() => {
        const rD = r / 100, qD = q / 100, sigD = sigma / 100;
        if (T <= 0 || sigD <= 0 || S <= 0 || K <= 0) return;
        const d1 = (Math.log(S / K) + (rD - qD + 0.5 * sigD * sigD) * T) / (sigD * Math.sqrt(T));
        const d2 = d1 - sigD * Math.sqrt(T);
        const Nd1 = normCDF(d1), Nd2 = normCDF(d2);
        const Nnd1 = normCDF(-d1), Nnd2 = normCDF(-d2);
        const callPrice = S * Math.exp(-qD * T) * Nd1 - K * Math.exp(-rD * T) * Nd2;
        const putPrice = K * Math.exp(-rD * T) * Nnd2 - S * Math.exp(-qD * T) * Nnd1;
        const callDelta = Math.exp(-qD * T) * Nd1;
        const putDelta = Math.exp(-qD * T) * (Nd1 - 1);
        const gamma = (normPDF(d1) * Math.exp(-qD * T)) / (S * sigD * Math.sqrt(T));
        const callTheta = (-(S * Math.exp(-qD * T) * normPDF(d1) * sigD) / (2 * Math.sqrt(T)) - rD * K * Math.exp(-rD * T) * Nd2 + qD * S * Math.exp(-qD * T) * Nd1) / 365;
        const putTheta = (-(S * Math.exp(-qD * T) * normPDF(d1) * sigD) / (2 * Math.sqrt(T)) + rD * K * Math.exp(-rD * T) * Nnd2 - qD * S * Math.exp(-qD * T) * Nnd1) / 365;
        const vega = S * Math.exp(-qD * T) * normPDF(d1) * Math.sqrt(T) / 100;
        const callRho = K * T * Math.exp(-rD * T) * Nd2 / 100;
        const putRho = -K * T * Math.exp(-rD * T) * Nnd2 / 100;
        const callIntrinsic = Math.max(0, S - K);
        const putIntrinsic = Math.max(0, K - S);
        setResult({ d1, d2, callPrice, putPrice, callDelta, putDelta, gamma, callTheta, putTheta, vega, callRho, putRho, callIntrinsic, callTimeValue: callPrice - callIntrinsic, putIntrinsic, putTimeValue: putPrice - putIntrinsic });
    }, [S, K, T, r, sigma, q]);

    const f = (v: number, d = 4) => v.toFixed(d);
    const days = Math.round(T * 365);

    const inputCls = "w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 mb-4">
                    <BarChart2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Input */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-fit space-y-4">
                    {[
                        { label: labels.stock_price, val: S, set: setS, step: 1 },
                        { label: labels.strike_price, val: K, set: setK, step: 1 },
                        { label: `${labels.time_to_expiry} (${days} ${labels.days_to_expiry})`, val: T, set: setT, step: 0.01 },
                        { label: labels.risk_free_rate, val: r, set: setR, step: 0.1 },
                        { label: labels.volatility, val: sigma, set: setSigma, step: 1 },
                        { label: labels.dividend_yield, val: q, set: setQ, step: 0.1 },
                    ].map(({ label, val, set, step }) => (
                        <div key={label}>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                            <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))} className={inputCls} />
                        </div>
                    ))}
                    <button onClick={calculate} className="w-full px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors shadow-lg shadow-purple-500/20">
                        {labels.calculate}
                    </button>
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-5">
                    {result ? (
                        <>
                            {/* Price Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">{labels.call_label} — {labels.call_price}</p>
                                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{f(result.callPrice, 2)}</p>
                                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                        <p>{labels.intrinsic_value}: {f(result.callIntrinsic, 2)}</p>
                                        <p>{labels.time_value}: {f(result.callTimeValue, 2)}</p>
                                    </div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 border border-red-100 dark:border-red-800">
                                    <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">{labels.put_label} — {labels.put_price}</p>
                                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">{f(result.putPrice, 2)}</p>
                                    <div className="mt-2 text-xs text-red-600 dark:text-red-400 space-y-1">
                                        <p>{labels.intrinsic_value}: {f(result.putIntrinsic, 2)}</p>
                                        <p>{labels.time_value}: {f(result.putTimeValue, 2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Greeks Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{labels.greeks_title}</h3>
                                </div>
                                <div className="p-4 grid grid-cols-3 gap-3">
                                    {[
                                        { label: labels.delta, call: f(result.callDelta), put: f(result.putDelta) },
                                        { label: labels.gamma, call: f(result.gamma, 6), put: f(result.gamma, 6) },
                                        { label: labels.theta, call: f(result.callTheta), put: f(result.putTheta) },
                                        { label: labels.vega, call: f(result.vega), put: f(result.vega) },
                                        { label: labels.rho, call: f(result.callRho), put: f(result.putRho) },
                                    ].map(({ label, call, put }) => (
                                        <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                                            <p className="text-sm text-blue-600 dark:text-blue-400">{labels.call_label}: {call}</p>
                                            <p className="text-sm text-red-600 dark:text-red-400">{labels.put_label}: {put}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                            <BarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">파라미터를 입력하고 계산하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
