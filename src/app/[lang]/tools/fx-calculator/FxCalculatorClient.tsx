'use client';

import React, { useState, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface Labels {
    title: string; description: string; from_currency: string; to_currency: string;
    amount: string; base_rate: string; discount_rate: string; spread_rate: string;
    calculate: string; result_title: string; receive_amount: string; applied_rate: string;
    fee_amount: string; net_rate: string; rate_guide: string; swap: string; reset: string;
    currencies: Record<string, string>;
}

const CURRENCIES = ['KRW', 'USD', 'JPY', 'EUR', 'GBP', 'CNY', 'HKD', 'SGD', 'AUD', 'CAD'];

export default function FxCalculatorClient({ labels }: { labels: Labels }) {
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('KRW');
    const [amount, setAmount] = useState(1000);
    const [baseRate, setBaseRate] = useState(1380);
    const [spreadRate, setSpreadRate] = useState(1.75);
    const [discountRate, setDiscountRate] = useState(0);
    const [result, setResult] = useState<{ receive: number; appliedRate: number; fee: number; netRate: number } | null>(null);

    const swapCurrencies = () => { setFrom(to); setTo(from); };

    const calculate = useCallback(() => {
        // effective spread after discount
        const effectiveSpread = spreadRate * (1 - discountRate / 100);
        // rate including spread
        const appliedRate = baseRate * (1 + effectiveSpread / 100);
        const fee = (appliedRate - baseRate) * amount;
        const receive = appliedRate * amount;
        const netRate = receive / amount;
        setResult({ receive, appliedRate, fee, netRate });
    }, [amount, baseRate, spreadRate, discountRate]);

    const fmtNum = (v: number, d = 2) => new Intl.NumberFormat('ko-KR', { maximumFractionDigits: d }).format(v);
    const inputCls = "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-4">
                    <ArrowLeftRight className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-5 mb-6">
                {/* Currency Selector */}
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.from_currency}</label>
                        <select value={from} onChange={e => setFrom(e.target.value)} className={inputCls}>
                            {CURRENCIES.map(c => <option key={c} value={c}>{labels.currencies[c] || c}</option>)}
                        </select>
                    </div>
                    <div className="pt-6">
                        <button onClick={swapCurrencies} className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors">
                            <ArrowLeftRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.to_currency}</label>
                        <select value={to} onChange={e => setTo(e.target.value)} className={inputCls}>
                            {CURRENCIES.map(c => <option key={c} value={c}>{labels.currencies[c] || c}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.amount} ({from})</label>
                    <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className={inputCls} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.base_rate} (1 {from} = ? {to})</label>
                    <input type="number" step="0.01" value={baseRate} onChange={e => setBaseRate(Number(e.target.value))} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.spread_rate}</label>
                        <input type="number" step="0.1" value={spreadRate} onChange={e => setSpreadRate(Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.discount_rate}</label>
                        <input type="number" step="1" min={0} max={100} value={discountRate} onChange={e => setDiscountRate(Number(e.target.value))} className={inputCls} />
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-500/20">
                    {labels.calculate}
                </button>
            </div>

            {result && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{labels.result_title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: labels.receive_amount, value: `${fmtNum(result.receive)} ${to}`, highlight: true },
                            { label: labels.applied_rate, value: `${fmtNum(result.appliedRate)} ${to}` },
                            { label: labels.fee_amount, value: `${fmtNum(result.fee)} ${to}`, red: true },
                            { label: labels.net_rate, value: `${fmtNum(result.netRate)} ${to}` },
                        ].map(({ label, value, highlight, red }) => (
                            <div key={label} className={`p-4 rounded-xl border ${highlight ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' : red ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700'}`}>
                                <p className={`text-xs font-medium mb-1 ${highlight ? 'text-blue-700 dark:text-blue-300' : red ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}>{label}</p>
                                <p className={`font-bold ${highlight ? 'text-xl text-blue-900 dark:text-blue-100' : red ? 'text-red-800 dark:text-red-200' : 'text-gray-900 dark:text-white'}`}>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
