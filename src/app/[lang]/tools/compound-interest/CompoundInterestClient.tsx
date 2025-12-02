'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, PiggyBank } from 'lucide-react';

interface CompoundInterestClientProps {
    lang: string;
    labels: {
        title: string;
        description: string;
        subtitle: string;
        input_principal: string;
        input_monthly: string;
        input_rate: string;
        input_years: string;
        result_final: string;
        result_principal: string;
        result_interest: string;
        chart_principal: string;
        chart_interest: string;
        table_year: string;
        table_total: string;
        table_interest: string;
    };
}

export default function CompoundInterestClient({ lang, labels }: CompoundInterestClientProps) {
    // State
    const [principal, setPrincipal] = useState<number>(1000000);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(100000);
    const [rate, setRate] = useState<number>(5);
    const [years, setYears] = useState<number>(10);

    // Currency Formatter
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US', {
            style: 'currency',
            currency: lang === 'ko' ? 'KRW' : lang === 'ja' ? 'JPY' : 'USD',
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Calculation Logic
    const result = useMemo(() => {
        const monthlyRate = rate / 100 / 12;
        const totalMonths = years * 12;

        let currentBalance = principal;
        let totalPrincipal = principal;

        const yearlyData = [];

        for (let i = 1; i <= totalMonths; i++) {
            currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
            totalPrincipal += monthlyContribution;

            if (i % 12 === 0) {
                yearlyData.push({
                    year: i / 12,
                    total: currentBalance,
                    principal: totalPrincipal,
                    interest: currentBalance - totalPrincipal,
                });
            }
        }

        return {
            finalBalance: currentBalance,
            totalPrincipal: totalPrincipal,
            totalInterest: currentBalance - totalPrincipal,
            yearlyData,
        };
    }, [principal, monthlyContribution, rate, years]);

    // Progress Bar Widths
    const principalPercent = (result.totalPrincipal / result.finalBalance) * 100;
    const interestPercent = 100 - principalPercent;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {labels.subtitle}
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <div className="space-y-6">
                            {/* Principal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.input_principal}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <PiggyBank className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="block w-full pl-10 pr-4 py-3 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Monthly Contribution */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.input_monthly}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        className="block w-full pl-10 pr-4 py-3 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.input_rate}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Percent className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        step="0.1"
                                        className="block w-full pl-10 pr-4 py-3 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Years */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.input_years}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="block w-full pl-10 pr-4 py-3 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full mt-4 accent-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Summary Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">
                        <h3 className="text-blue-100 font-medium mb-2">{labels.result_final}</h3>
                        <div className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">
                            {formatCurrency(result.finalBalance)}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2 text-blue-100">
                                <span>{labels.chart_principal} ({principalPercent.toFixed(1)}%)</span>
                                <span>{labels.chart_interest} ({interestPercent.toFixed(1)}%)</span>
                            </div>
                            <div className="h-4 bg-blue-900/40 rounded-full overflow-hidden flex">
                                <div
                                    style={{ width: `${principalPercent}%` }}
                                    className="h-full bg-blue-300 transition-all duration-500"
                                />
                                <div
                                    style={{ width: `${interestPercent}%` }}
                                    className="h-full bg-yellow-400 transition-all duration-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-blue-500/30">
                            <div>
                                <p className="text-blue-200 text-sm mb-1">{labels.result_principal}</p>
                                <p className="text-xl font-bold">{formatCurrency(result.totalPrincipal)}</p>
                            </div>
                            <div>
                                <p className="text-blue-200 text-sm mb-1">{labels.result_interest}</p>
                                <p className="text-xl font-bold text-yellow-300">{formatCurrency(result.totalInterest)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Yearly Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">{labels.table_year}</th>
                                        <th className="px-6 py-4 font-medium">{labels.table_total}</th>
                                        <th className="px-6 py-4 font-medium text-right">{labels.table_interest}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {result.yearlyData.map((data) => (
                                        <tr key={data.year} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {data.year}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {formatCurrency(data.total)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-medium">
                                                +{formatCurrency(data.interest)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
