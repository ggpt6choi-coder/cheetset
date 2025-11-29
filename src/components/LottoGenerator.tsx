"use client";

import { useState, useEffect } from "react";

type Props = {
    labels: {
        generate: string;
        save: string;
        saved_numbers: string;
        no_saved: string;
    };
};

export default function LottoGenerator({ labels }: Props) {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [savedList, setSavedList] = useState<number[][]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("lotto_saved");
        if (saved) {
            setSavedList(JSON.parse(saved));
        }
    }, []);

    const generateNumbers = () => {
        setIsAnimating(true);
        setNumbers([]);

        // Simple animation effect
        let interval: NodeJS.Timeout;
        let counter = 0;

        interval = setInterval(() => {
            const tempNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
            setNumbers(tempNumbers);
            counter++;

            if (counter > 10) {
                clearInterval(interval);
                const newNumbers: number[] = [];
                while (newNumbers.length < 6) {
                    const num = Math.floor(Math.random() * 45) + 1;
                    if (!newNumbers.includes(num)) {
                        newNumbers.push(num);
                    }
                }
                newNumbers.sort((a, b) => a - b);
                setNumbers(newNumbers);
                setIsAnimating(false);
            }
        }, 50);
    };

    const saveNumbers = () => {
        if (numbers.length === 0) return;
        const newList = [numbers, ...savedList].slice(0, 10); // Keep last 10
        setSavedList(newList);
        localStorage.setItem("lotto_saved", JSON.stringify(newList));
    };

    const deleteSaved = (index: number) => {
        const newList = savedList.filter((_, i) => i !== index);
        setSavedList(newList);
        localStorage.setItem("lotto_saved", JSON.stringify(newList));
    };

    const getBallColor = (num: number) => {
        if (num <= 10) return "bg-yellow-400 text-yellow-900 border-yellow-500";
        if (num <= 20) return "bg-blue-400 text-blue-900 border-blue-500";
        if (num <= 30) return "bg-red-400 text-red-900 border-red-500";
        if (num <= 40) return "bg-gray-400 text-gray-900 border-gray-500";
        return "bg-green-400 text-green-900 border-green-500";
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[80px] items-center">
                    {numbers.length > 0 ? (
                        numbers.map((num, idx) => (
                            <div
                                key={idx}
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold border-b-4 shadow-lg transform transition-all duration-300 ${getBallColor(
                                    num
                                )} ${isAnimating ? "scale-110" : "scale-100"}`}
                            >
                                {num}
                            </div>
                        ))
                    ) : (
                        <div className="flex gap-4 opacity-20">
                            {[1, 2, 3, 4, 5, 6].map((_, i) => (
                                <div key={i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 dark:bg-gray-700 border-b-4 border-gray-300 dark:border-gray-600"></div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={generateNumbers}
                        disabled={isAnimating}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {labels.generate} 🎲
                    </button>
                    {numbers.length > 0 && (
                        <button
                            onClick={saveNumbers}
                            disabled={isAnimating}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50"
                        >
                            {labels.save} 💾
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.saved_numbers}
                </h3>
                {savedList.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        {labels.no_saved}
                    </p>
                ) : (
                    <div className="space-y-3">
                        {savedList.map((nums, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center group"
                            >
                                <div className="flex gap-2">
                                    {nums.map((num, i) => (
                                        <span
                                            key={i}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-b-2 ${getBallColor(
                                                num
                                            )}`}
                                        >
                                            {num}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => deleteSaved(idx)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                    aria-label="Delete"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
