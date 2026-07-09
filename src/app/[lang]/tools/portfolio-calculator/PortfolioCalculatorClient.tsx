'use client';

import React, { useState, useCallback } from 'react';
import { PieChart, Plus, Trash2 } from 'lucide-react';

interface Labels {
    title: string; description: string; add_stock: string; stock_name: string;
    buy_price: string; current_price: string; quantity: string; weight: string;
    return_pct: string; profit_loss: string; total_invested: string; total_value: string;
    total_profit: string; weighted_return: string; remove: string; chart_title: string;
    no_stocks: string; calculate: string;
}

interface Holding { id: number; name: string; buyPrice: number; currentPrice: number; qty: number; }

const PALETTE = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#84cc16'];

export default function PortfolioCalculatorClient({ labels }: { labels: Labels }) {
    const [holdings, setHoldings] = useState<Holding[]>([
        { id: 1, name: 'AAPL', buyPrice: 150, currentPrice: 195, qty: 50 },
        { id: 2, name: 'MSFT', buyPrice: 280, currentPrice: 420, qty: 30 },
        { id: 3, name: 'NVDA', buyPrice: 400, currentPrice: 1100, qty: 10 },
    ]);

    const add = () => setHoldings(prev => prev.length < 10 ? [...prev, { id: Date.now(), name: '', buyPrice: 0, currentPrice: 0, qty: 0 }] : prev);
    const remove = (id: number) => setHoldings(prev => prev.filter(h => h.id !== id));
    const update = (id: number, field: keyof Holding, value: string | number) => {
        setHoldings(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    const calculated = useCallback(() => {
        const rows = holdings.map(h => ({
            ...h,
            invested: h.buyPrice * h.qty,
            currentVal: h.currentPrice * h.qty,
            pl: (h.currentPrice - h.buyPrice) * h.qty,
            returnPct: h.buyPrice > 0 ? (h.currentPrice / h.buyPrice - 1) * 100 : 0,
        }));
        const totalInvested = rows.reduce((a, r) => a + r.invested, 0);
        const totalValue = rows.reduce((a, r) => a + r.currentVal, 0);
        const totalPL = totalValue - totalInvested;
        const weightedReturn = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;
        const withWeight = rows.map(r => ({ ...r, weight: totalValue > 0 ? r.currentVal / totalValue * 100 : 0 }));
        return { rows: withWeight, totalInvested, totalValue, totalPL, weightedReturn };
    }, [holdings]);

    const data = calculated();
    const fmt = (v: number) => new Intl.NumberFormat('ko-KR').format(Math.round(v));
    const inputCls = "w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm";

    // Simple donut using SVG
    const total = data.rows.reduce((a, r) => a + r.currentVal, 0);
    let cumAngle = -90;
    const svgPaths = data.rows.filter(r => r.currentVal > 0).map((r, i) => {
        const angle = (r.currentVal / total) * 360;
        const startAngle = cumAngle;
        cumAngle += angle;
        const endAngle = cumAngle;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const x1 = 50 + 38 * Math.cos(startRad), y1 = 50 + 38 * Math.sin(startRad);
        const x2 = 50 + 38 * Math.cos(endRad), y2 = 50 + 38 * Math.sin(endRad);
        const large = angle > 180 ? 1 : 0;
        return <path key={i} d={`M 50 50 L ${x1} ${y1} A 38 38 0 ${large} 1 ${x2} ${y2} Z`} fill={PALETTE[i % PALETTE.length]} />;
    });

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                    <PieChart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    {[labels.stock_name, labels.buy_price, labels.current_price, labels.quantity, labels.weight, labels.return_pct, labels.profit_loss, ''].map(h => (
                                        <th key={h} className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data.rows.map((r, i) => (
                                    <tr key={r.id}>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full inline-block" style={{ background: PALETTE[i % PALETTE.length] }} />
                                                <input value={r.name} onChange={e => update(r.id, 'name', e.target.value)} className={inputCls} placeholder="AAPL" />
                                            </div>
                                        </td>
                                        <td className="px-3 py-3"><input type="number" value={r.buyPrice} onChange={e => update(r.id, 'buyPrice', Number(e.target.value))} className={inputCls} /></td>
                                        <td className="px-3 py-3"><input type="number" value={r.currentPrice} onChange={e => update(r.id, 'currentPrice', Number(e.target.value))} className={inputCls} /></td>
                                        <td className="px-3 py-3"><input type="number" value={r.qty} onChange={e => update(r.id, 'qty', Number(e.target.value))} className={inputCls} /></td>
                                        <td className="px-3 py-3 text-gray-600 dark:text-gray-400">{r.weight.toFixed(1)}%</td>
                                        <td className={`px-3 py-3 font-medium ${r.returnPct >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{r.returnPct >= 0 ? '+' : ''}{r.returnPct.toFixed(2)}%</td>
                                        <td className={`px-3 py-3 font-medium ${r.pl >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{r.pl >= 0 ? '+' : ''}₩{fmt(r.pl)}</td>
                                        <td className="px-3 py-3"><button onClick={() => remove(r.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                        <button onClick={add} disabled={holdings.length >= 10} className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium disabled:opacity-40">
                            <Plus className="w-4 h-4" /> {labels.add_stock}
                        </button>
                    </div>
                </div>

                {/* Summary + Chart */}
                <div className="space-y-4">
                    {/* Donut */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{labels.chart_title}</h3>
                        <div className="flex justify-center mb-3">
                            <svg viewBox="0 0 100 100" className="w-36 h-36">
                                {svgPaths}
                                <circle cx="50" cy="50" r="22" fill="white" className="dark:fill-gray-800" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            {data.rows.filter(r => r.currentVal > 0).map((r, i) => (
                                <div key={r.id} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                                        <span className="text-gray-700 dark:text-gray-300">{r.name || '–'}</span>
                                    </div>
                                    <span className="text-gray-500">{r.weight.toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
                        {[
                            { label: labels.total_invested, value: `₩${fmt(data.totalInvested)}`, color: 'gray' },
                            { label: labels.total_value, value: `₩${fmt(data.totalValue)}`, color: 'indigo' },
                            { label: labels.total_profit, value: `${data.totalPL >= 0 ? '+' : ''}₩${fmt(data.totalPL)}`, color: data.totalPL >= 0 ? 'blue' : 'red' },
                            { label: labels.weighted_return, value: `${data.weightedReturn >= 0 ? '+' : ''}${data.weightedReturn.toFixed(2)}%`, color: data.weightedReturn >= 0 ? 'blue' : 'red' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                                <span className={`font-bold text-${color}-600 dark:text-${color}-400`}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
