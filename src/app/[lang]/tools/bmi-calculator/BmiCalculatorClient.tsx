'use client';

import { useState } from 'react';
import { Activity, Calculator, RotateCcw, Info, HeartPulse } from 'lucide-react';

interface BmiCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        height: string;
        weight: string;
        calculate: string;
        result: string;
        bmi_score: string;
        status: string;
        status_underweight: string;
        status_normal: string;
        status_overweight: string;
        status_obese: string;
        status_severe_obese: string;
        table_title: string;
        table_bmi: string;
        table_status: string;
        tip_title: string;
        tip_underweight: string;
        tip_normal: string;
        tip_overweight: string;
        tip_obese: string;
        tip_severe_obese: string;
    };
}

export default function BmiCalculatorClient({ labels }: BmiCalculatorClientProps) {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [statusColor, setStatusColor] = useState<string>('');
    const [healthTip, setHealthTip] = useState<string>('');

    const calculateBMI = () => {
        if (!height || !weight) return;

        const h = parseFloat(height) / 100; // convert cm to m
        const w = parseFloat(weight);

        if (h <= 0 || w <= 0) return;

        const bmiValue = w / (h * h);
        const roundedBmi = Math.round(bmiValue * 10) / 10;
        setBmi(roundedBmi);

        if (bmiValue < 18.5) {
            setStatus(labels.status_underweight);
            setStatusColor('text-blue-500');
            setHealthTip(labels.tip_underweight);
        } else if (bmiValue < 23) {
            setStatus(labels.status_normal);
            setStatusColor('text-green-500');
            setHealthTip(labels.tip_normal);
        } else if (bmiValue < 25) {
            setStatus(labels.status_overweight);
            setStatusColor('text-yellow-500');
            setHealthTip(labels.tip_overweight);
        } else if (bmiValue < 30) {
            setStatus(labels.status_obese);
            setStatusColor('text-orange-500');
            setHealthTip(labels.tip_obese);
        } else {
            setStatus(labels.status_severe_obese);
            setStatusColor('text-red-500');
            setHealthTip(labels.tip_severe_obese);
        }
    };

    const handleReset = () => {
        setHeight('');
        setWeight('');
        setBmi(null);
        setStatus(null);
        setStatusColor('');
        setHealthTip('');
    };

    // Calculate position for the indicator (0-100%)
    // Scale: 10 (0%) -> 40 (100%)
    const getIndicatorPosition = (bmiValue: number) => {
        const min = 10;
        const max = 40;
        const percentage = ((bmiValue - min) / (max - min)) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Activity className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
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
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.height}
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="175"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.weight}
                                </label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="70"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Reset
                                </button>
                                <button
                                    onClick={calculateBMI}
                                    className="flex-[2] px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                                >
                                    <Calculator className="w-5 h-5" />
                                    {labels.calculate}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reference Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-2">
                            <Info className="w-5 h-5 text-gray-500" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {labels.table_title}
                            </h3>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">{labels.table_bmi}</th>
                                        <th className="px-6 py-3">{labels.table_status}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{'< 18.5'}</td>
                                        <td className="px-6 py-4 text-blue-500 font-medium">{labels.status_underweight}</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">18.5 - 22.9</td>
                                        <td className="px-6 py-4 text-green-500 font-medium">{labels.status_normal}</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">23 - 24.9</td>
                                        <td className="px-6 py-4 text-yellow-500 font-medium">{labels.status_overweight}</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">25 - 29.9</td>
                                        <td className="px-6 py-4 text-orange-500 font-medium">{labels.status_obese}</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{'≥ 30'}</td>
                                        <td className="px-6 py-4 text-red-500 font-medium">{labels.status_severe_obese}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center min-h-[300px]">
                        {bmi !== null ? (
                            <div className="space-y-8 animate-in fade-in zoom-in duration-300 w-full">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        {labels.bmi_score}
                                    </h3>
                                    <div className="text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                                        {bmi}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        {labels.status}
                                    </h3>
                                    <div className={`text-4xl font-bold ${statusColor}`}>
                                        {status}
                                    </div>
                                </div>

                                {/* Visual Bar */}
                                <div className="relative pt-6 pb-2">
                                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                                        {/* 10 to 18.5 = 8.5 units */}
                                        <div className="flex-[8.5] bg-blue-400 opacity-80" />
                                        {/* 18.5 to 23 = 4.5 units */}
                                        <div className="flex-[4.5] bg-green-400 opacity-80" />
                                        {/* 23 to 25 = 2 units */}
                                        <div className="flex-[2] bg-yellow-400 opacity-80" />
                                        {/* 25 to 30 = 5 units */}
                                        <div className="flex-[5] bg-orange-400 opacity-80" />
                                        {/* 30 to 40 = 10 units */}
                                        <div className="flex-[10] bg-red-400 opacity-80" />
                                    </div>

                                    {/* Indicator */}
                                    <div
                                        className="absolute top-2 w-1 h-8 bg-gray-900 dark:bg-white rounded-full shadow-lg transition-all duration-500 ease-out z-10"
                                        style={{
                                            left: `${getIndicatorPosition(bmi)}%`,
                                            transform: 'translateX(-50%)'
                                        }}
                                    />

                                    {/* Labels */}
                                    <div className="relative w-full h-6 text-xs text-gray-400 mt-2 font-mono">
                                        <span className="absolute -translate-x-1/2 left-[28.33%]">18.5</span>
                                        <span className="absolute -translate-x-1/2 left-[43.33%]">23</span>
                                        <span className="absolute -translate-x-1/2 left-[50%]">25</span>
                                        <span className="absolute -translate-x-1/2 left-[66.66%]">30</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400 dark:text-gray-500 space-y-4">
                                <Activity className="w-16 h-16 mx-auto opacity-50" />
                                <p className="text-lg">{labels.result} will appear here</p>
                            </div>
                        )}
                    </div>

                    {/* Health Tip */}
                    {bmi !== null && healthTip && (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg shrink-0">
                                    <HeartPulse className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                                        {labels.tip_title}
                                    </h3>
                                    <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed">
                                        {healthTip}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

