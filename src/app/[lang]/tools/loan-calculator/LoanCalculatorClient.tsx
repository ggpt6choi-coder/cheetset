'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Percent, PieChart, RefreshCw, Download } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

interface LoanCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        amount_label: string;
        rate_label: string;
        period_label: string;
        period_unit: string;
        type_label: string;
        type_equal_principal_interest: string;
        type_equal_principal: string;
        type_maturity: string;
        calculate_button: string;
        monthly_payment: string;
        total_interest: string;
        total_payment: string;
        chart_principal: string;
        chart_interest: string;
        schedule_title: string;
        col_month: string;
        col_payment: string;
        col_principal: string;
        col_interest: string;
        col_balance: string;
        download_schedule: string;
    };
}

type RepaymentType = 'equal_principal_interest' | 'equal_principal' | 'maturity';

interface PaymentSchedule {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

export default function LoanCalculatorClient({ labels, lang }: LoanCalculatorClientProps & { lang: string }) {
    const [amount, setAmount] = useState<number>(10000000);
    const [rate, setRate] = useState<number>(5.0);
    const [period, setPeriod] = useState<number>(12);
    const [type, setType] = useState<RepaymentType>('equal_principal_interest');
    const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
    const [summary, setSummary] = useState({
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
    });

    const getCurrencyConfig = (lang: string) => {
        switch (lang) {
            case 'ko':
                return { locale: 'ko-KR', currency: 'KRW', symbol: '₩' };
            case 'ja':
                return { locale: 'ja-JP', currency: 'JPY', symbol: '¥' };
            case 'en':
            default:
                return { locale: 'en-US', currency: 'USD', symbol: '$' };
        }
    };

    const { locale, currency, symbol } = getCurrencyConfig(lang);

    const calculateLoan = () => {
        let tempSchedule: PaymentSchedule[] = [];
        let totalInterest = 0;
        let monthlyRate = rate / 100 / 12;
        let balance = amount;

        if (type === 'equal_principal_interest') {
            // 원리금균등상환
            const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, period)) / (Math.pow(1 + monthlyRate, period) - 1);

            for (let i = 1; i <= period; i++) {
                const interest = balance * monthlyRate;
                const principal = monthlyPayment - interest;
                balance -= principal;
                if (balance < 0) balance = 0; // Floating point fix

                tempSchedule.push({
                    month: i,
                    payment: monthlyPayment,
                    principal: principal,
                    interest: interest,
                    balance: balance
                });
                totalInterest += interest;
            }
        } else if (type === 'equal_principal') {
            // 원금균등상환
            const monthlyPrincipal = amount / period;

            for (let i = 1; i <= period; i++) {
                const interest = balance * monthlyRate;
                const payment = monthlyPrincipal + interest;
                balance -= monthlyPrincipal;
                if (balance < 0) balance = 0;

                tempSchedule.push({
                    month: i,
                    payment: payment,
                    principal: monthlyPrincipal,
                    interest: interest,
                    balance: balance
                });
                totalInterest += interest;
            }
        } else {
            // 만기일시상환
            const monthlyInterest = amount * monthlyRate;

            for (let i = 1; i <= period; i++) {
                const isLast = i === period;
                const principal = isLast ? amount : 0;
                const payment = monthlyInterest + principal;
                balance -= principal;

                tempSchedule.push({
                    month: i,
                    payment: payment,
                    principal: principal,
                    interest: monthlyInterest,
                    balance: balance
                });
                totalInterest += monthlyInterest;
            }
        }

        setSchedule(tempSchedule);
        setSummary({
            monthlyPayment: type === 'equal_principal_interest' ? tempSchedule[0].payment : 0, // 0 means varies
            totalInterest: totalInterest,
            totalPayment: amount + totalInterest
        });
    };

    useEffect(() => {
        calculateLoan();
    }, []);

    const formatMoney = (val: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val);
    };

    const handleDownload = () => {
        const data = schedule.map(row => ({
            [labels.col_month]: row.month,
            [labels.col_payment]: Math.round(row.payment),
            [labels.col_principal]: Math.round(row.principal),
            [labels.col_interest]: Math.round(row.interest),
            [labels.col_balance]: Math.round(row.balance),
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");
        XLSX.writeFile(workbook, "loan_schedule.xlsx");
    };

    const chartData = {
        labels: [labels.chart_principal, labels.chart_interest],
        datasets: [
            {
                data: [amount, summary.totalInterest],
                backgroundColor: ['#3b82f6', '#ef4444'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.amount_label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-medium">
                                {symbol}
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="pl-10 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.rate_label} (%)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Percent className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                value={rate}
                                step="0.1"
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="pl-10 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.period_label} ({labels.period_unit})
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                value={period}
                                onChange={(e) => setPeriod(Number(e.target.value))}
                                className="pl-10 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.type_label}
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as RepaymentType)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="equal_principal_interest">{labels.type_equal_principal_interest}</option>
                            <option value="equal_principal">{labels.type_equal_principal}</option>
                            <option value="maturity">{labels.type_maturity}</option>
                        </select>
                    </div>

                    <button
                        onClick={calculateLoan}
                        className="w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        <Calculator className="w-5 h-5" />
                        {labels.calculate_button}
                    </button>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">{labels.monthly_payment}</h3>
                            <p className="text-lg font-bold text-blue-900 dark:text-blue-100 break-words tracking-tight">
                                {type === 'equal_principal_interest'
                                    ? formatMoney(summary.monthlyPayment)
                                    : '~' + formatMoney(schedule[0]?.payment || 0)}
                            </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">{labels.total_interest}</h3>
                            <p className="text-lg font-bold text-red-900 dark:text-red-100 break-words tracking-tight">{formatMoney(summary.totalInterest)}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                            <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">{labels.total_payment}</h3>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100 break-words tracking-tight">{formatMoney(summary.totalPayment)}</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-center">
                        <div className="w-64 h-64">
                            <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Schedule Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{labels.schedule_title}</h3>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                {labels.download_schedule}
                            </button>
                        </div>
                        <div className="overflow-x-auto max-h-[500px]">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">{labels.col_month}</th>
                                        <th className="px-6 py-3">{labels.col_payment}</th>
                                        <th className="px-6 py-3">{labels.col_principal}</th>
                                        <th className="px-6 py-3">{labels.col_interest}</th>
                                        <th className="px-6 py-3">{labels.col_balance}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((row) => (
                                        <tr key={row.month} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.month}</td>
                                            <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{formatMoney(row.payment)}</td>
                                            <td className="px-6 py-4">{formatMoney(row.principal)}</td>
                                            <td className="px-6 py-4 text-red-500">{formatMoney(row.interest)}</td>
                                            <td className="px-6 py-4 text-gray-500">{formatMoney(row.balance)}</td>
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
