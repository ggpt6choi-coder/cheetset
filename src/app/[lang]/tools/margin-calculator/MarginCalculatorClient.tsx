'use client';

import React, { useState, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Labels {
    title: string; description: string; instrument_type: string; type_futures: string;
    type_options: string; type_crypto: string; underlying_price: string;
    contract_size: string; num_contracts: string; margin_rate: string;
    position_type: string; long: string; short: string; calculate: string;
    total_exposure: string; required_margin: string; leverage: string;
    liquidation_price: string; profit_per_tick: string; tick_size: string; warning: string;
}

type InstrumentType = 'futures' | 'options' | 'crypto';
type PositionType = 'long' | 'short';

export default function MarginCalculatorClient({ labels }: { labels: Labels }) {
    const [instrument, setInstrument] = useState<InstrumentType>('futures');
    const [price, setPrice] = useState(100000);
    const [contractSize, setContractSize] = useState(100);
    const [numContracts, setNumContracts] = useState(5);
    const [marginRate, setMarginRate] = useState(10);
    const [position, setPosition] = useState<PositionType>('long');
    const [tickSize, setTickSize] = useState(5);
    const [result, setResult] = useState<{ exposure: number; margin: number; leverage: number; liqPrice: number; profitPerTick: number } | null>(null);

    const calculate = useCallback(() => {
        const exposure = price * contractSize * numContracts;
        const margin = exposure * (marginRate / 100);
        const leverage = exposure / margin;
        const liqPrice = position === 'long'
            ? price * (1 - 1 / leverage)
            : price * (1 + 1 / leverage);
        const profitPerTick = tickSize * contractSize * numContracts;
        setResult({ exposure, margin, leverage, liqPrice, profitPerTick });
    }, [price, contractSize, numContracts, marginRate, position, tickSize]);

    const fmt = (v: number, d = 0) => new Intl.NumberFormat('ko-KR', { maximumFractionDigits: d }).format(v);
    const inputCls = "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 mb-4">
                    <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                    {/* Instrument type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.instrument_type}</label>
                        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            {([['futures', labels.type_futures], ['options', labels.type_options], ['crypto', labels.type_crypto]] as [InstrumentType, string][]).map(([type, label]) => (
                                <button key={type} onClick={() => setInstrument(type)} className={`flex-1 py-2 text-sm font-medium transition-colors ${instrument === type ? 'bg-orange-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.position_type}</label>
                        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            {([['long', labels.long], ['short', labels.short]] as [PositionType, string][]).map(([pos, label]) => (
                                <button key={pos} onClick={() => setPosition(pos)} className={`flex-1 py-2 text-sm font-medium transition-colors ${position === pos ? (pos === 'long' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white') : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {[
                        { label: labels.underlying_price, val: price, set: setPrice, step: 100 },
                        { label: labels.contract_size, val: contractSize, set: setContractSize, step: 1 },
                        { label: labels.num_contracts, val: numContracts, set: setNumContracts, step: 1 },
                        { label: labels.margin_rate, val: marginRate, set: setMarginRate, step: 0.5 },
                        { label: labels.tick_size, val: tickSize, set: setTickSize, step: 1 },
                    ].map(({ label, val, set, step }) => (
                        <div key={label}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                            <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))} className={inputCls} />
                        </div>
                    ))}
                    <button onClick={calculate} className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/20">
                        {labels.calculate}
                    </button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {result ? (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: labels.total_exposure, value: `₩${fmt(result.exposure)}`, color: 'gray' },
                                    { label: labels.required_margin, value: `₩${fmt(result.margin)}`, color: 'orange' },
                                    { label: labels.leverage, value: `${fmt(result.leverage, 1)}x`, color: 'red' },
                                    { label: labels.liquidation_price, value: fmt(result.liqPrice, 0), color: 'red' },
                                    { label: labels.profit_per_tick, value: `₩${fmt(result.profitPerTick)}`, color: 'blue' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/20 p-4 rounded-xl border border-${color}-100 dark:border-${color}-800`}>
                                        <p className={`text-xs font-medium text-${color}-700 dark:text-${color}-300 mb-1`}>{label}</p>
                                        <p className={`text-base font-bold text-${color}-900 dark:text-${color}-100`}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Leverage visual bar */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{labels.leverage}: {fmt(result.leverage, 1)}x</p>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(100, result.leverage / 20 * 100)}%`,
                                            background: result.leverage < 5 ? '#10b981' : result.leverage < 10 ? '#f59e0b' : '#ef4444'
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>1x</span><span>5x</span><span>10x</span><span>15x</span><span>20x+</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                            <AlertTriangle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">계약 정보를 입력하고 계산하세요</p>
                        </div>
                    )}

                    {/* Warning */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <p className="text-xs text-amber-700 dark:text-amber-300">{labels.warning}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
