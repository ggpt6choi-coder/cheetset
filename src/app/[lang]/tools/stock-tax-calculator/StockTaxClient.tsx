'use client';

import React, { useState, useCallback } from 'react';
import { Receipt, Plus, Trash2 } from 'lucide-react';

interface Labels {
    title: string; description: string; add_trade: string; stock_name: string;
    buy_price: string; sell_price: string; quantity: string; profit_loss: string;
    remove: string; total_profit: string; total_loss: string; net_gain: string;
    basic_deduction: string; taxable_income: string; tax_rate: string;
    total_tax: string; local_tax: string; no_tax: string; tax_note: string;
    currency: string; exchange_rate: string; calculate: string; reset: string;
}

interface Trade { id: number; name: string; buyPrice: number; sellPrice: number; qty: number; }

const DEDUCTION = 2500000;
const TAX_RATE = 0.22;

export default function StockTaxClient({ labels }: { labels: Labels }) {
    const [trades, setTrades] = useState<Trade[]>([
        { id: 1, name: 'Apple (AAPL)', buyPrice: 150, sellPrice: 200, qty: 100 },
        { id: 2, name: 'Tesla (TSLA)', buyPrice: 300, sellPrice: 220, qty: 50 },
    ]);
    const [exchangeRate, setExchangeRate] = useState(1380);
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState<{
        totalProfit: number; totalLoss: number; netGain: number;
        taxable: number; tax: number; perTrade: number[];
    } | null>(null);

    const addTrade = () => setTrades(prev => [...prev, { id: Date.now(), name: '', buyPrice: 0, sellPrice: 0, qty: 1 }]);
    const removeTrade = (id: number) => setTrades(prev => prev.filter(t => t.id !== id));
    const updateTrade = (id: number, field: keyof Trade, value: string | number) => {
        setTrades(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const calculate = useCallback(() => {
        const perTrade = trades.map(t => (t.sellPrice - t.buyPrice) * t.qty * exchangeRate);
        const totalProfit = perTrade.filter(v => v > 0).reduce((a, b) => a + b, 0);
        const totalLoss = perTrade.filter(v => v < 0).reduce((a, b) => a + b, 0);
        const netGain = totalProfit + totalLoss;
        const taxable = Math.max(0, netGain - DEDUCTION);
        const tax = taxable * TAX_RATE;
        setResult({ totalProfit, totalLoss, netGain, taxable, tax, perTrade });
    }, [trades, exchangeRate]);

    const fmt = (v: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(v);
    const inputCls = "w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                    <Receipt className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-40">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.currency}</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputCls}>
                        {['USD', 'JPY', 'EUR', 'GBP', 'CNY'].map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-40">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.exchange_rate} ({currency}/KRW)</label>
                    <input type="number" value={exchangeRate} onChange={e => setExchangeRate(Number(e.target.value))} className={inputCls} />
                </div>
            </div>

            {/* Trade Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                {[labels.stock_name, labels.buy_price, labels.sell_price, labels.quantity, labels.profit_loss, ''].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {trades.map((t, i) => {
                                const pl = (t.sellPrice - t.buyPrice) * t.qty * exchangeRate;
                                return (
                                    <tr key={t.id}>
                                        <td className="px-4 py-3"><input value={t.name} onChange={e => updateTrade(t.id, 'name', e.target.value)} className={inputCls} placeholder="AAPL" /></td>
                                        <td className="px-4 py-3"><input type="number" value={t.buyPrice} onChange={e => updateTrade(t.id, 'buyPrice', Number(e.target.value))} className={inputCls} /></td>
                                        <td className="px-4 py-3"><input type="number" value={t.sellPrice} onChange={e => updateTrade(t.id, 'sellPrice', Number(e.target.value))} className={inputCls} /></td>
                                        <td className="px-4 py-3"><input type="number" value={t.qty} onChange={e => updateTrade(t.id, 'qty', Number(e.target.value))} className={inputCls} /></td>
                                        <td className={`px-4 py-3 font-medium ${result ? (pl >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400') : 'text-gray-400'}`}>
                                            {result ? fmt(result.perTrade[i]) : '-'}
                                        </td>
                                        <td className="px-4 py-3"><button onClick={() => removeTrade(t.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <button onClick={addTrade} className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 font-medium">
                        <Plus className="w-4 h-4" /> {labels.add_trade}
                    </button>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button onClick={calculate} className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors shadow-lg shadow-yellow-500/20">
                    {labels.calculate}
                </button>
                <button onClick={() => setResult(null)} className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    {labels.reset}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { label: labels.total_profit, value: fmt(result.totalProfit), color: 'blue' },
                            { label: labels.total_loss, value: fmt(result.totalLoss), color: 'red' },
                            { label: labels.net_gain, value: fmt(result.netGain), color: result.netGain >= 0 ? 'emerald' : 'red' },
                            { label: labels.basic_deduction, value: fmt(DEDUCTION), color: 'gray' },
                            { label: labels.taxable_income, value: fmt(result.taxable), color: 'orange' },
                            { label: labels.total_tax, value: result.tax > 0 ? fmt(result.tax) : labels.no_tax, color: result.tax > 0 ? 'red' : 'emerald' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/20 p-4 rounded-xl border border-${color}-100 dark:border-${color}-800`}>
                                <p className={`text-xs font-medium text-${color}-700 dark:text-${color}-300 mb-1`}>{label}</p>
                                <p className={`text-base font-bold text-${color}-900 dark:text-${color}-100`}>{value}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">{labels.tax_note}</p>
                </div>
            )}
        </div>
    );
}
