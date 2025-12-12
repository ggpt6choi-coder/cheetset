'use client';

import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw, User } from 'lucide-react';

interface BmrCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        gender_label: string;
        gender_male: string;
        gender_female: string;
        age_label: string;
        height_label: string;
        weight_label: string;
        activity_label: string;
        activity_sedentary: string;
        activity_light: string;
        activity_moderate: string;
        activity_active: string;
        activity_very_active: string;
        calculate_button: string;
        result_bmr: string;
        result_tdee: string;
        result_tdee_desc: string;
    };
}

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export default function BmrCalculatorClient({ labels }: BmrCalculatorClientProps) {
    const [gender, setGender] = useState<Gender>('male');
    const [age, setAge] = useState<number>(25);
    const [height, setHeight] = useState<number>(175);
    const [weight, setWeight] = useState<number>(70);
    const [activity, setActivity] = useState<ActivityLevel>('sedentary');
    const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

    const calculateBmr = () => {
        // Mifflin-St Jeor Equation
        let bmr = 10 * weight + 6.25 * height - 5 * age;
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        let multiplier = 1.2;
        switch (activity) {
            case 'sedentary': multiplier = 1.2; break;
            case 'light': multiplier = 1.375; break;
            case 'moderate': multiplier = 1.55; break;
            case 'active': multiplier = 1.725; break;
            case 'very_active': multiplier = 1.9; break;
        }

        const tdee = bmr * multiplier;
        setResult({ bmr, tdee });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.gender_label}
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setGender('male')}
                                className={`flex-1 py-2 rounded-xl border transition-colors ${gender === 'male'
                                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {labels.gender_male}
                            </button>
                            <button
                                onClick={() => setGender('female')}
                                className={`flex-1 py-2 rounded-xl border transition-colors ${gender === 'female'
                                    ? 'bg-pink-50 border-pink-500 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {labels.gender_female}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.age_label}
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.height_label} (cm)
                            </label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.weight_label} (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.activity_label}
                        </label>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="sedentary">{labels.activity_sedentary}</option>
                            <option value="light">{labels.activity_light}</option>
                            <option value="moderate">{labels.activity_moderate}</option>
                            <option value="active">{labels.activity_active}</option>
                            <option value="very_active">{labels.activity_very_active}</option>
                        </select>
                    </div>

                    <button
                        onClick={calculateBmr}
                        className="w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        <Calculator className="w-5 h-5" />
                        {labels.calculate_button}
                    </button>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {result ? (
                        <>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 text-center animate-in fade-in zoom-in duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                    <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    {labels.result_bmr} (BMR)
                                </h3>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {Math.round(result.bmr).toLocaleString()} <span className="text-xl text-gray-500">kcal</span>
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-white/80 mb-2">
                                    {labels.result_tdee} (TDEE)
                                </h3>
                                <p className="text-4xl font-bold text-white mb-4">
                                    {Math.round(result.tdee).toLocaleString()} <span className="text-xl text-white/70">kcal</span>
                                </p>
                                <p className="text-sm text-white/70">
                                    {labels.result_tdee_desc}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-12">
                            <Activity className="w-16 h-16 mb-4 opacity-50" />
                            <p className="text-lg text-center">
                                Enter your details and click calculate to see your BMR and TDEE.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
