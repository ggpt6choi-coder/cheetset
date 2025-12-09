'use client';

import { useState, useEffect } from 'react';
import { Calculator, RotateCcw, DollarSign, Percent, ArrowRightLeft } from 'lucide-react';

interface VatCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        amount_label: string;
        rate_label: string;
        add_tax: string;
        remove_tax: string;
        vat_amount: string;
        total_amount: string;
        net_amount: string;
    };
    lang: string;
}

export default function VatCalculatorClient({ labels, lang }: VatCalculatorClientProps) {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState('10'); // Default 10%
    const [mode, setMode] = useState<'add' | 'remove'>('add'); // 'add' = Exclusive -> Inclusive, 'remove' = Inclusive -> Exclusive

    const [result, setResult] = useState<{
        net: number;
        vat: number;
        total: number;
    } | null>(null);

    useEffect(() => {
        calculate();
    }, [amount, rate, mode]);

    const calculate = () => {
        if (!amount || !rate) {
            setResult(null);
            return;
        }

        const amt = parseFloat(amount);
        const r = parseFloat(rate);

        if (isNaN(amt) || isNaN(r)) {
            setResult(null);
            return;
        }

        let net, vat, total;

        if (mode === 'add') {
            // Amount is Net (Tax Exclusive)
            net = amt;
            vat = net * (r / 100);
            total = net + vat;
        } else {
            // Amount is Total (Tax Inclusive)
            total = amt;
            net = total / (1 + r / 100);
            vat = total - net;
        }

        setResult({
            net,
            vat,
            total
        });
    };

    const handleReset = () => {
        setAmount('');
        setRate('10');
        setResult(null);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US', {
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                        <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">

                        {/* Mode Toggle */}
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl mb-6">
                            <button
                                onClick={() => setMode('add')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'add'
                                        ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {labels.add_tax}
                            </button>
                            <button
                                onClick={() => setMode('remove')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'remove'
                                        ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {labels.remove_tax}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.amount_label}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="1000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.rate_label}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Percent className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="10"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleReset}
                                className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center">
                    {result ? (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    {labels.net_amount}
                                </h3>
                                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(result.net)}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                                    {labels.vat_amount} ({rate}%)
                                </h3>
                                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                    + {formatCurrency(result.vat)}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-right">
                                    {labels.total_amount}
                                </h3>
                                <div className="text-4xl font-bold text-gray-900 dark:text-white text-right tracking-tight">
                                    {formatCurrency(result.total)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 dark:text-gray-500 space-y-4 py-12">
                            <Calculator className="w-16 h-16 mx-auto opacity-50" />
                            <p className="text-lg">Enter amount to calculate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
