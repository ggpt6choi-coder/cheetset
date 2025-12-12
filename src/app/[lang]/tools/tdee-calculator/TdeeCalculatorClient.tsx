'use client';

import React, { useState, useEffect } from 'react';
import { Activity, User, Ruler, Weight, Flame, Target, Utensils } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

interface TdeeCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        gender_label: string;
        male: string;
        female: string;
        age_label: string;
        height_label: string;
        weight_label: string;
        activity_label: string;
        activity_sedentary: string;
        activity_light: string;
        activity_moderate: string;
        activity_active: string;
        activity_very_active: string;
        goal_label: string;
        goal_lose: string;
        goal_maintain: string;
        goal_gain: string;
        calculate_button: string;
        result_tdee: string;
        result_macros: string;
        macro_carbs: string;
        macro_protein: string;
        macro_fat: string;
    };
}

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'lose' | 'maintain' | 'gain';

export default function TdeeCalculatorClient({ labels }: TdeeCalculatorClientProps) {
    const [gender, setGender] = useState<Gender>('male');
    const [age, setAge] = useState<number>(25);
    const [height, setHeight] = useState<number>(175);
    const [weight, setWeight] = useState<number>(70);
    const [activity, setActivity] = useState<ActivityLevel>('moderate');
    const [goal, setGoal] = useState<Goal>('maintain');

    const [tdee, setTdee] = useState<number>(0);
    const [macros, setMacros] = useState({ carbs: 0, protein: 0, fat: 0 });

    const calculateTDEE = () => {
        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr += gender === 'male' ? 5 : -161;

        const multipliers: Record<ActivityLevel, number> = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        const baseTdee = bmr * multipliers[activity];
        let targetCalories = baseTdee;

        if (goal === 'lose') targetCalories -= 500;
        if (goal === 'gain') targetCalories += 500;

        // Ensure calories don't go too low
        targetCalories = Math.max(targetCalories, 1200);

        setTdee(Math.round(targetCalories));

        // Macros: Carbs 50%, Protein 30%, Fat 20%
        setMacros({
            carbs: Math.round((targetCalories * 0.5) / 4),
            protein: Math.round((targetCalories * 0.3) / 4),
            fat: Math.round((targetCalories * 0.2) / 9)
        });
    };

    useEffect(() => {
        calculateTDEE();
    }, []);

    const chartData = {
        labels: [labels.macro_carbs, labels.macro_protein, labels.macro_fat],
        datasets: [
            {
                data: [macros.carbs * 4, macros.protein * 4, macros.fat * 9], // Display in calories for chart proportion
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <Activity className="w-8 h-8 text-teal-500" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.gender_label}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setGender('male')}
                                className={`py-2 px-4 rounded-xl border flex items-center justify-center gap-2 transition-colors ${gender === 'male'
                                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                {labels.male}
                            </button>
                            <button
                                onClick={() => setGender('female')}
                                className={`py-2 px-4 rounded-xl border flex items-center justify-center gap-2 transition-colors ${gender === 'female'
                                        ? 'bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/30 dark:border-pink-800 dark:text-pink-300'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                {labels.female}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.age_label}
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="w-full pl-4 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        {/* Height */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.height_label} (cm)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Ruler className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.weight_label} (kg)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Weight className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.activity_label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Flame className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                                value={activity}
                                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="sedentary">{labels.activity_sedentary}</option>
                                <option value="light">{labels.activity_light}</option>
                                <option value="moderate">{labels.activity_moderate}</option>
                                <option value="active">{labels.activity_active}</option>
                                <option value="very_active">{labels.activity_very_active}</option>
                            </select>
                        </div>
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.goal_label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Target className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value as Goal)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="lose">{labels.goal_lose}</option>
                                <option value="maintain">{labels.goal_maintain}</option>
                                <option value="gain">{labels.goal_gain}</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={calculateTDEE}
                        className="w-full px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                    >
                        <Utensils className="w-5 h-5" />
                        {labels.calculate_button}
                    </button>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {/* TDEE Card */}
                    <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
                        <h3 className="text-teal-100 font-medium mb-1">{labels.result_tdee}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">{tdee.toLocaleString()}</span>
                            <span className="text-teal-100">kcal</span>
                        </div>
                    </div>

                    {/* Macros Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{labels.result_macros}</h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-40 h-40 flex-shrink-0">
                                <Doughnut data={chartData} options={{ maintainAspectRatio: false, cutout: '70%' }} />
                            </div>
                            <div className="flex-1 w-full space-y-4">
                                {/* Carbs */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-gray-700 dark:text-gray-300">{labels.macro_carbs}</span>
                                    </div>
                                    <span className="font-bold text-emerald-700 dark:text-emerald-300">{macros.carbs}g</span>
                                </div>
                                {/* Protein */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-gray-700 dark:text-gray-300">{labels.macro_protein}</span>
                                    </div>
                                    <span className="font-bold text-blue-700 dark:text-blue-300">{macros.protein}g</span>
                                </div>
                                {/* Fat */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-gray-700 dark:text-gray-300">{labels.macro_fat}</span>
                                    </div>
                                    <span className="font-bold text-amber-700 dark:text-amber-300">{macros.fat}g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
