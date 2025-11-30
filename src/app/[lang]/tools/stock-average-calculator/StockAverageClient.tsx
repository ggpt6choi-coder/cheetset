'use client';

import { useState } from 'react';

interface StockAverageClientProps {
    labels: {
        title: string;
        description: string;
        current_price: string;
        current_quantity: string;
        add_price: string;
        add_quantity: string;
        calculate: string;
        reset: string;
        result_avg_price: string;
        result_total_quantity: string;
        result_total_amount: string;
    };
}

export default function StockAverageClient({ labels }: StockAverageClientProps) {
    const [currentPrice, setCurrentPrice] = useState<string>('');
    const [currentQuantity, setCurrentQuantity] = useState<string>('');
    const [addPrice, setAddPrice] = useState<string>('');
    const [addQuantity, setAddQuantity] = useState<string>('');

    const [result, setResult] = useState<{
        avgPrice: number;
        totalQuantity: number;
        totalAmount: number;
    } | null>(null);

    const handleCalculate = () => {
        const cp = parseFloat(currentPrice.replace(/,/g, ''));
        const cq = parseFloat(currentQuantity.replace(/,/g, ''));
        const ap = parseFloat(addPrice.replace(/,/g, ''));
        const aq = parseFloat(addQuantity.replace(/,/g, ''));

        if (isNaN(cp) || isNaN(cq) || isNaN(ap) || isNaN(aq)) {
            return;
        }

        const totalAmount = (cp * cq) + (ap * aq);
        const totalQuantity = cq + aq;
        const avgPrice = totalAmount / totalQuantity;

        setResult({
            avgPrice,
            totalQuantity,
            totalAmount
        });
    };

    const handleReset = () => {
        setCurrentPrice('');
        setCurrentQuantity('');
        setAddPrice('');
        setAddQuantity('');
        setResult(null);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{labels.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{labels.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400 border-b pb-2">Current Holding</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.current_price}</label>
                        <input
                            type="number"
                            value={currentPrice}
                            onChange={(e) => setCurrentPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.current_quantity}</label>
                        <input
                            type="number"
                            value={currentQuantity}
                            onChange={(e) => setCurrentQuantity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-green-600 dark:text-green-400 border-b pb-2">Additional Buy</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.add_price}</label>
                        <input
                            type="number"
                            value={addPrice}
                            onChange={(e) => setAddPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.add_quantity}</label>
                        <input
                            type="number"
                            value={addQuantity}
                            onChange={(e) => setAddQuantity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={handleCalculate}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                >
                    {labels.calculate}
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    {labels.reset}
                </button>
            </div>

            {result && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{labels.result_avg_price}</p>
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(result.avgPrice)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{labels.result_total_quantity}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatNumber(result.totalQuantity)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{labels.result_total_amount}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatNumber(result.totalAmount)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
