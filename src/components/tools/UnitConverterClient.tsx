'use client';

import React, { useState, useEffect } from 'react';
import { Ruler, Weight, Beaker, Map, Thermometer } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'volume' | 'area' | 'temperature';

interface UnitConverterProps {
    labels: {
        length: string;
        weight: string;
        volume: string;
        area: string;
        temperature: string;
        input: string;
        result: string;
        select_unit: string;
    };
}

const categories: { id: UnitCategory; icon: React.ElementType }[] = [
    { id: 'length', icon: Ruler },
    { id: 'weight', icon: Weight },
    { id: 'volume', icon: Beaker },
    { id: 'area', icon: Map },
    { id: 'temperature', icon: Thermometer },
];

const units: Record<UnitCategory, { value: string; label: string; ratio: number; offset?: number }[]> = {
    length: [
        { value: 'mm', label: 'Millimeter (mm)', ratio: 0.001 },
        { value: 'cm', label: 'Centimeter (cm)', ratio: 0.01 },
        { value: 'm', label: 'Meter (m)', ratio: 1 },
        { value: 'km', label: 'Kilometer (km)', ratio: 1000 },
        { value: 'in', label: 'Inch (in)', ratio: 0.0254 },
        { value: 'ft', label: 'Foot (ft)', ratio: 0.3048 },
        { value: 'yd', label: 'Yard (yd)', ratio: 0.9144 },
        { value: 'mi', label: 'Mile (mi)', ratio: 1609.34 },
    ],
    weight: [
        { value: 'mg', label: 'Milligram (mg)', ratio: 0.000001 },
        { value: 'g', label: 'Gram (g)', ratio: 0.001 },
        { value: 'kg', label: 'Kilogram (kg)', ratio: 1 },
        { value: 'oz', label: 'Ounce (oz)', ratio: 0.0283495 },
        { value: 'lb', label: 'Pound (lb)', ratio: 0.453592 },
    ],
    volume: [
        { value: 'ml', label: 'Milliliter (ml)', ratio: 0.001 },
        { value: 'l', label: 'Liter (l)', ratio: 1 },
        { value: 'tsp', label: 'Teaspoon (tsp)', ratio: 0.00492892 },
        { value: 'tbsp', label: 'Tablespoon (tbsp)', ratio: 0.0147868 },
        { value: 'fl_oz', label: 'Fluid Ounce (fl oz)', ratio: 0.0295735 },
        { value: 'cup', label: 'Cup', ratio: 0.236588 },
        { value: 'pt', label: 'Pint (pt)', ratio: 0.473176 },
        { value: 'qt', label: 'Quart (qt)', ratio: 0.946353 },
        { value: 'gal', label: 'Gallon (gal)', ratio: 3.78541 },
    ],
    area: [
        { value: 'm2', label: 'Square Meter (m²)', ratio: 1 },
        { value: 'km2', label: 'Square Kilometer (km²)', ratio: 1000000 },
        { value: 'ft2', label: 'Square Foot (ft²)', ratio: 0.092903 },
        { value: 'ac', label: 'Acre (ac)', ratio: 4046.86 },
        { value: 'ha', label: 'Hectare (ha)', ratio: 10000 },
        { value: 'py', label: 'Pyeong (평)', ratio: 3.30579 },
    ],
    temperature: [
        { value: 'c', label: 'Celsius (°C)', ratio: 1 },
        { value: 'f', label: 'Fahrenheit (°F)', ratio: 1 },
        { value: 'k', label: 'Kelvin (K)', ratio: 1 },
    ],
};

export default function UnitConverterClient({ labels }: UnitConverterProps) {
    const [category, setCategory] = useState<UnitCategory>('length');
    const [fromUnit, setFromUnit] = useState<string>(units.length[2].value); // meter
    const [toUnit, setToUnit] = useState<string>(units.length[3].value); // km
    const [inputValue, setInputValue] = useState<string>('1');
    const [resultValue, setResultValue] = useState<string>('');

    // Reset units when category changes
    useEffect(() => {
        setFromUnit(units[category][0].value);
        setToUnit(units[category][1].value);
    }, [category]);

    useEffect(() => {
        convert();
    }, [inputValue, fromUnit, toUnit, category]);

    const convert = () => {
        const input = parseFloat(inputValue);
        if (isNaN(input)) {
            setResultValue('');
            return;
        }

        let result = 0;

        if (category === 'temperature') {
            if (fromUnit === 'c') {
                if (toUnit === 'f') result = (input * 9 / 5) + 32;
                else if (toUnit === 'k') result = input + 273.15;
                else result = input;
            } else if (fromUnit === 'f') {
                if (toUnit === 'c') result = (input - 32) * 5 / 9;
                else if (toUnit === 'k') result = (input - 32) * 5 / 9 + 273.15;
                else result = input;
            } else if (fromUnit === 'k') {
                if (toUnit === 'c') result = input - 273.15;
                else if (toUnit === 'f') result = (input - 273.15) * 9 / 5 + 32;
                else result = input;
            }
        } else {
            const from = units[category].find(u => u.value === fromUnit);
            const to = units[category].find(u => u.value === toUnit);

            if (from && to) {
                const baseValue = input * from.ratio;
                result = baseValue / to.ratio;
            }
        }

        // Format result to avoid floating point errors but keep precision
        setResultValue(Number(result.toPrecision(10)).toString());
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <Icon size={16} />
                            {labels[cat.id]}
                        </button>
                    );
                })}
            </div>

            {/* Converter Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* From Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {labels.input}
                        </label>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="0"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {units[category].map((u) => (
                                <option key={u.value} value={u.value}>
                                    {u.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Arrow Icon (Hidden on mobile, visible on desktop) */}
                    <div className="hidden md:flex justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>

                    {/* To Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {labels.result}
                        </label>
                        <div className="w-full px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100 text-lg font-semibold break-all">
                            {resultValue || '0'}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {units[category].map((u) => (
                                <option key={u.value} value={u.value}>
                                    {u.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
