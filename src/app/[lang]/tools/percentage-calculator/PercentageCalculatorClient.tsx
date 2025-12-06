'use client';

import { useState } from 'react';
import { Percent, ArrowRight, RotateCcw } from 'lucide-react';

interface PercentageCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        calc1_label: string;
        calc1_desc: string;
        calc1_result: string;
        calc2_label: string;
        calc2_desc: string;
        calc2_result: string;
        calc3_label: string;
        calc3_desc: string;
        calc3_result: string;
        calculate: string;
        result: string;
    };
}

export default function PercentageCalculatorClient({ labels }: PercentageCalculatorClientProps) {
    // Calc 1: X% of Y is what?
    const [calc1X, setCalc1X] = useState('');
    const [calc1Y, setCalc1Y] = useState('');
    const [result1, setResult1] = useState<number | null>(null);

    // Calc 2: X is what % of Y?
    const [calc2X, setCalc2X] = useState('');
    const [calc2Y, setCalc2Y] = useState('');
    const [result2, setResult2] = useState<number | null>(null);

    // Calc 3: Percentage change from X to Y
    const [calc3X, setCalc3X] = useState('');
    const [calc3Y, setCalc3Y] = useState('');
    const [result3, setResult3] = useState<number | null>(null);

    const calculate1 = () => {
        const x = parseFloat(calc1X);
        const y = parseFloat(calc1Y);
        if (!isNaN(x) && !isNaN(y)) {
            setResult1((x / 100) * y);
        }
    };

    const calculate2 = () => {
        const x = parseFloat(calc2X);
        const y = parseFloat(calc2Y);
        if (!isNaN(x) && !isNaN(y) && y !== 0) {
            setResult2((x / y) * 100);
        }
    };

    const calculate3 = () => {
        const x = parseFloat(calc3X);
        const y = parseFloat(calc3Y);
        if (!isNaN(x) && !isNaN(y) && x !== 0) {
            setResult3(((y - x) / x) * 100);
        }
    };

    const resetAll = () => {
        setCalc1X(''); setCalc1Y(''); setResult1(null);
        setCalc2X(''); setCalc2Y(''); setResult2(null);
        setCalc3X(''); setCalc3Y(''); setResult3(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Percent className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Calculator 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold mr-3">1</span>
                        {labels.calc1_label}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <input
                                type="number"
                                value={calc1Y}
                                onChange={(e) => setCalc1Y(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 text-center text-lg"
                                placeholder="100"
                            />
                        </div>
                        <span className="text-gray-500 font-medium">{labels.calc1_desc}</span>
                        <div className="relative flex-1 w-full">
                            <div className="relative">
                                <input
                                    type="number"
                                    value={calc1X}
                                    onChange={(e) => setCalc1X(e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 pr-8 text-center text-lg"
                                    placeholder="20"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                            </div>
                        </div>
                        <span className="text-gray-500 font-medium whitespace-nowrap">{labels.calc1_result}</span>
                        <button
                            onClick={calculate1}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {labels.calculate}
                        </button>
                    </div>
                    {result1 !== null && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold block mb-1">{labels.result}</span>
                            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result1.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                    )}
                </div>

                {/* Calculator 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold mr-3">2</span>
                        {labels.calc2_label}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <input
                                type="number"
                                value={calc2X}
                                onChange={(e) => setCalc2X(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 text-center text-lg"
                                placeholder="20"
                            />
                        </div>
                        <span className="text-gray-500 font-medium">{labels.calc2_desc}</span>
                        <div className="relative flex-1 w-full">
                            <input
                                type="number"
                                value={calc2Y}
                                onChange={(e) => setCalc2Y(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 text-center text-lg"
                                placeholder="100"
                            />
                        </div>
                        <span className="text-gray-500 font-medium whitespace-nowrap">{labels.calc2_result}</span>
                        <button
                            onClick={calculate2}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {labels.calculate}
                        </button>
                    </div>
                    {result2 !== null && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold block mb-1">{labels.result}</span>
                            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</span>
                        </div>
                    )}
                </div>

                {/* Calculator 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold mr-3">3</span>
                        {labels.calc3_label}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <input
                                type="number"
                                value={calc3X}
                                onChange={(e) => setCalc3X(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 text-center text-lg"
                                placeholder="100"
                            />
                        </div>
                        <span className="text-gray-500 font-medium">{labels.calc3_desc}</span>
                        <div className="relative flex-1 w-full">
                            <input
                                type="number"
                                value={calc3Y}
                                onChange={(e) => setCalc3Y(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 p-3 text-center text-lg"
                                placeholder="150"
                            />
                        </div>
                        <span className="text-gray-500 font-medium whitespace-nowrap">{labels.calc3_result}</span>
                        <button
                            onClick={calculate3}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {labels.calculate}
                        </button>
                    </div>
                    {result3 !== null && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold block mb-1">{labels.result}</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`text-3xl font-bold ${result3 > 0 ? 'text-green-600 dark:text-green-400' : result3 < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {result3 > 0 ? '+' : ''}{result3.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={resetAll}
                    className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All
                </button>
            </div>
        </div>
    );
}
