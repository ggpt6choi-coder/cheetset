'use client';

import React, { useState, useCallback } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface Labels {
    title: string; description: string; face_value: string; coupon_rate: string;
    maturity_years: string; market_rate: string; coupon_frequency: string;
    freq_annual: string; freq_semi: string; freq_quarterly: string; calculate: string;
    bond_price: string; ytm: string; duration: string; modified_duration: string;
    cashflow_title: string; col_period: string; col_coupon: string; col_principal: string;
    col_total: string; col_pv: string; discount_premium: string;
    at_par: string; at_discount: string; at_premium: string;
}

interface CashFlow { period: number; coupon: number; principal: number; total: number; pv: number; }

export default function BondCalculatorClient({ labels }: { labels: Labels }) {
    const [faceValue, setFaceValue] = useState(1000000);
    const [couponRate, setCouponRate] = useState(3.5);
    const [maturityYears, setMaturityYears] = useState(3);
    const [marketRate, setMarketRate] = useState(4.0);
    const [frequency, setFrequency] = useState(2);
    const [result, setResult] = useState<{ price: number; ytm: number; duration: number; modDuration: number; cashflows: CashFlow[] } | null>(null);

    const calculate = useCallback(() => {
        const c = (couponRate / 100 / frequency) * faceValue;
        const r = marketRate / 100 / frequency;
        const n = maturityYears * frequency;

        // Bond Price
        let price = 0;
        for (let t = 1; t <= n; t++) {
            price += c / Math.pow(1 + r, t);
        }
        price += faceValue / Math.pow(1 + r, n);

        // Duration (Macaulay)
        let weightedTime = 0;
        for (let t = 1; t <= n; t++) {
            const pv = c / Math.pow(1 + r, t);
            weightedTime += (t / frequency) * pv;
        }
        weightedTime += (n / frequency) * (faceValue / Math.pow(1 + r, n));
        const duration = weightedTime / price;
        const modDuration = duration / (1 + marketRate / 100 / frequency);

        // YTM (Newton-Raphson solve from market rate)
        const ytm = marketRate; // YTM == market rate when using market rate as discount

        // Cash flows
        const cashflows: CashFlow[] = [];
        for (let t = 1; t <= n; t++) {
            const isLast = t === n;
            const coup = c;
            const prin = isLast ? faceValue : 0;
            const total = coup + prin;
            const pv = total / Math.pow(1 + r, t);
            cashflows.push({ period: t, coupon: coup, principal: prin, total, pv });
        }

        setResult({ price, ytm, duration, modDuration, cashflows });
    }, [faceValue, couponRate, maturityYears, marketRate, frequency]);

    const fmt = (v: number) => new Intl.NumberFormat('ko-KR').format(Math.round(v));
    const priceDiff = result ? ((result.price - faceValue) / faceValue) * 100 : 0;
    const priceLabel = result
        ? priceDiff === 0 ? labels.at_par
        : priceDiff > 0 ? `${labels.at_premium} (+${priceDiff.toFixed(2)}%)`
        : `${labels.at_discount} (${priceDiff.toFixed(2)}%)`
        : '';

    const inputCls = "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                    <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-fit space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.face_value}</label>
                        <input type="number" value={faceValue} onChange={e => setFaceValue(Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.coupon_rate}</label>
                        <input type="number" step="0.1" value={couponRate} onChange={e => setCouponRate(Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.maturity_years}</label>
                        <input type="number" step="1" value={maturityYears} onChange={e => setMaturityYears(Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.market_rate}</label>
                        <input type="number" step="0.1" value={marketRate} onChange={e => setMarketRate(Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.coupon_frequency}</label>
                        <select value={frequency} onChange={e => setFrequency(Number(e.target.value))} className={inputCls}>
                            <option value={1}>{labels.freq_annual}</option>
                            <option value={2}>{labels.freq_semi}</option>
                            <option value={4}>{labels.freq_quarterly}</option>
                        </select>
                    </div>
                    <button onClick={calculate} className="w-full px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                        <RefreshCw className="w-4 h-4" /> {labels.calculate}
                    </button>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    {result ? (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: labels.bond_price, value: `₩${fmt(result.price)}`, sub: priceLabel, color: 'blue' },
                                    { label: labels.ytm, value: `${result.ytm.toFixed(3)}%`, color: 'emerald' },
                                    { label: labels.duration, value: `${result.duration.toFixed(4)} 년`, color: 'violet' },
                                    { label: labels.modified_duration, value: result.modDuration.toFixed(4), color: 'orange' },
                                ].map(({ label, value, sub, color }) => (
                                    <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/20 p-5 rounded-2xl border border-${color}-100 dark:border-${color}-800`}>
                                        <p className={`text-sm font-medium text-${color}-700 dark:text-${color}-300 mb-1`}>{label}</p>
                                        <p className={`text-xl font-bold text-${color}-900 dark:text-${color}-100`}>{value}</p>
                                        {sub && <p className={`text-xs mt-1 text-${color}-600 dark:text-${color}-400`}>{sub}</p>}
                                    </div>
                                ))}
                            </div>

                            {/* Cashflow Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{labels.cashflow_title}</h3>
                                </div>
                                <div className="overflow-x-auto max-h-72">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                            <tr>
                                                {[labels.col_period, labels.col_coupon, labels.col_principal, labels.col_total, labels.col_pv].map(h => (
                                                    <th key={h} className="px-4 py-3">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.cashflows.map(cf => (
                                                <tr key={cf.period} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-4 py-3 font-medium">{cf.period}</td>
                                                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400">{fmt(cf.coupon)}</td>
                                                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400">{fmt(cf.principal)}</td>
                                                    <td className="px-4 py-3 font-semibold">{fmt(cf.total)}</td>
                                                    <td className="px-4 py-3 text-gray-500">{fmt(cf.pv)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                            <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">정보를 입력하고 계산하기를 클릭하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
