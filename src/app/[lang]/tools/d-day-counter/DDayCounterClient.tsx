'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Calculator, RotateCcw } from 'lucide-react';

interface DDayCounterClientProps {
    labels: {
        title: string;
        description: string;
        target_date: string;
        title_label: string;
        calc_type: string;
        type_d_day: string;
        type_date_count: string;
        include_today: string;
        calculate: string;
        result: string;
        days_left: string;
        days_passed: string;
        today: string;
    };
}

export default function DDayCounterClient({ labels }: DDayCounterClientProps) {
    const [targetDate, setTargetDate] = useState('');
    const [title, setTitle] = useState('');
    const [calcType, setCalcType] = useState<'d_day' | 'date_count'>('d_day');
    const [includeToday, setIncludeToday] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [resultDays, setResultDays] = useState<number | null>(null);

    // Set default date to today
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setTargetDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    const calculate = () => {
        if (!targetDate) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const target = new Date(targetDate);
        target.setHours(0, 0, 0, 0);

        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (calcType === 'd_day') {
            // D-Day Calculation
            if (diffDays > 0) {
                setResult(`D-${diffDays}`);
                setResultDays(diffDays);
            } else if (diffDays < 0) {
                setResult(`D+${Math.abs(diffDays)}`);
                setResultDays(Math.abs(diffDays));
            } else {
                setResult('D-Day');
                setResultDays(0);
            }
        } else {
            // Date Count Calculation (e.g., for couples, anniversaries)
            // Usually counts days passed since start date.
            // If includeToday is true, Day 1 is the start date.

            // For "Days Passed" usually we want target date to be in the past
            // But logic works same: (Today - Target)

            const passedTime = today.getTime() - target.getTime();
            let passedDays = Math.floor(passedTime / (1000 * 60 * 60 * 24));

            if (includeToday) {
                passedDays += 1;
            }

            setResult(`${passedDays}${labels.days_passed}`);
            setResultDays(passedDays);
        }
    };

    const handleReset = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setTargetDate(`${yyyy}-${mm}-${dd}`);
        setTitle('');
        setCalcType('d_day');
        setIncludeToday(false);
        setResult(null);
        setResultDays(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.calc_type}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setCalcType('d_day')}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${calcType === 'd_day'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {labels.type_d_day}
                                </button>
                                <button
                                    onClick={() => setCalcType('date_count')}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${calcType === 'date_count'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {labels.type_date_count}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.target_date}
                            </label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.title_label}
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex. Birthday, Exam"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        {calcType === 'date_count' && (
                            <div className="flex items-center">
                                <input
                                    id="include-today"
                                    type="checkbox"
                                    checked={includeToday}
                                    onChange={(e) => setIncludeToday(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="include-today" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    {labels.include_today}
                                </label>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleReset}
                                className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset
                            </button>
                            <button
                                onClick={calculate}
                                className="flex-[2] px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                <Calculator className="w-5 h-5" />
                                {labels.calculate}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center min-h-[300px]">
                    {result ? (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                            {title && (
                                <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                    {title}
                                </h3>
                            )}
                            <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
                                {result}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{targetDate}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-400 dark:text-gray-500 space-y-4">
                            <Calendar className="w-16 h-16 mx-auto opacity-50" />
                            <p className="text-lg">{labels.result} will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
