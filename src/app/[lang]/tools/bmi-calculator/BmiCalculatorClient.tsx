'use client';

import { useState } from 'react';
import { Activity, Calculator, RotateCcw } from 'lucide-react';

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
    };
}

export default function BmiCalculatorClient({ labels }: BmiCalculatorClientProps) {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [statusColor, setStatusColor] = useState<string>('');

    const calculateBMI = () => {
        if (!height || !weight) return;

        const h = parseFloat(height) / 100; // convert cm to m
        const w = parseFloat(weight);

        if (h <= 0 || w <= 0) return;

        const bmiValue = w / (h * h);
        const roundedBmi = Math.round(bmiValue * 10) / 10;
        setBmi(roundedBmi);

        // Classification based on WHO/General standards, adjusted slightly for Asian context if needed,
        // but let's stick to a common standard for now or KSSO (Korean Society for the Study of Obesity)
        // KSSO: <18.5 Underweight, 18.5-22.9 Normal, 23-24.9 Overweight, >=25 Obese
        // Let's use a slightly broader standard for general use but lean towards KSSO since it's a Korean site primarily.
        // Actually, let's use standard:
        // < 18.5: Underweight (Blue)
        // 18.5 - 22.9: Normal (Green)
        // 23 - 24.9: Overweight (Yellow/Orange)
        // 25 - 29.9: Obese I (Orange)
        // >= 30: Obese II (Red)

        if (bmiValue < 18.5) {
            setStatus(labels.status_underweight);
            setStatusColor('text-blue-500');
        } else if (bmiValue < 23) {
            setStatus(labels.status_normal);
            setStatusColor('text-green-500');
        } else if (bmiValue < 25) {
            setStatus(labels.status_overweight);
            setStatusColor('text-yellow-500');
        } else if (bmiValue < 30) {
            setStatus(labels.status_obese);
            setStatusColor('text-orange-500');
        } else {
            setStatus(labels.status_severe_obese);
            setStatusColor('text-red-500');
        }
    };

    const handleReset = () => {
        setHeight('');
        setWeight('');
        setBmi(null);
        setStatus(null);
        setStatusColor('');
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
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

                {/* Result Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center min-h-[300px]">
                    {bmi !== null ? (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-300 w-full">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    {labels.bmi_score}
                                </h3>
                                <div className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    {bmi}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    {labels.status}
                                </h3>
                                <div className={`text-3xl font-bold ${statusColor}`}>
                                    {status}
                                </div>
                            </div>

                            {/* Visual Bar */}
                            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4 relative">
                                <div
                                    className="absolute top-0 bottom-0 w-2 bg-black dark:bg-white transition-all duration-500 ease-out rounded-full shadow-lg"
                                    style={{
                                        left: `${Math.min(Math.max((bmi - 10) * 3, 0), 100)}%`,
                                        transform: 'translateX(-50%)'
                                    }}
                                />
                                <div className="flex h-full w-full">
                                    <div className="flex-1 bg-blue-400 opacity-50"></div>
                                    <div className="flex-1 bg-green-400 opacity-50"></div>
                                    <div className="flex-1 bg-yellow-400 opacity-50"></div>
                                    <div className="flex-1 bg-orange-400 opacity-50"></div>
                                    <div className="flex-1 bg-red-400 opacity-50"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 px-1">
                                <span>18.5</span>
                                <span>23</span>
                                <span>25</span>
                                <span>30</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-400 dark:text-gray-500 space-y-4">
                            <Activity className="w-16 h-16 mx-auto opacity-50" />
                            <p className="text-lg">{labels.result} will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
