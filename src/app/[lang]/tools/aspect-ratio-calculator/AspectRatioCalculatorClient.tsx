'use client';

import { useState, useEffect } from 'react';
import { Monitor, RotateCcw, ArrowRight } from 'lucide-react';

interface AspectRatioCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        width_label: string;
        height_label: string;
        ratio_label: string;
        calculate: string;
        result: string;
        common_ratios: string;
    };
}

export default function AspectRatioCalculatorClient({ labels }: AspectRatioCalculatorClientProps) {
    const [width, setWidth] = useState('1920');
    const [height, setHeight] = useState('1080');
    const [ratioW, setRatioW] = useState('16');
    const [ratioH, setRatioH] = useState('9');
    const [lastEdited, setLastEdited] = useState<'width' | 'height'>('width');

    useEffect(() => {
        calculate();
    }, [width, height, ratioW, ratioH, lastEdited]);

    const calculate = () => {
        const w = parseFloat(width);
        const h = parseFloat(height);
        const rw = parseFloat(ratioW);
        const rh = parseFloat(ratioH);

        if (isNaN(rw) || isNaN(rh) || rw <= 0 || rh <= 0) return;

        if (lastEdited === 'width') {
            if (!isNaN(w) && w > 0) {
                const newHeight = (w * rh) / rw;
                // Avoid infinite loop by checking if value actually changed significantly
                if (Math.abs(newHeight - h) > 0.1) {
                    setHeight(Math.round(newHeight).toString());
                }
            }
        } else {
            if (!isNaN(h) && h > 0) {
                const newWidth = (h * rw) / rh;
                if (Math.abs(newWidth - w) > 0.1) {
                    setWidth(Math.round(newWidth).toString());
                }
            }
        }
    };

    const handleRatioClick = (w: number, h: number) => {
        setRatioW(w.toString());
        setRatioH(h.toString());
        // Trigger calculation based on current width
        setLastEdited('width');
    };

    const handleReset = () => {
        setWidth('1920');
        setHeight('1080');
        setRatioW('16');
        setRatioH('9');
        setLastEdited('width');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                        <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">

                        {/* Common Ratios */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                {labels.common_ratios}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { w: 16, h: 9, label: '16:9' },
                                    { w: 4, h: 3, label: '4:3' },
                                    { w: 21, h: 9, label: '21:9' },
                                    { w: 1, h: 1, label: '1:1' },
                                    { w: 9, h: 16, label: '9:16' },
                                ].map((r) => (
                                    <button
                                        key={r.label}
                                        onClick={() => handleRatioClick(r.w, r.h)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${ratioW === r.w.toString() && ratioH === r.h.toString()
                                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ratio Width
                                </label>
                                <input
                                    type="number"
                                    value={ratioW}
                                    onChange={(e) => {
                                        setRatioW(e.target.value);
                                        setLastEdited('width');
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ratio Height
                                </label>
                                <input
                                    type="number"
                                    value={ratioH}
                                    onChange={(e) => {
                                        setRatioH(e.target.value);
                                        setLastEdited('width');
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.width_label}
                                </label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => {
                                        setWidth(e.target.value);
                                        setLastEdited('width');
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${lastEdited === 'width'
                                            ? 'border-blue-500 ring-2 ring-blue-500/20'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.height_label}
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => {
                                        setHeight(e.target.value);
                                        setLastEdited('height');
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${lastEdited === 'height'
                                            ? 'border-blue-500 ring-2 ring-blue-500/20'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleReset}
                            className="w-full mt-6 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Reset
                        </button>
                    </div>
                </div>

                {/* Visual Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <div
                            className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center transition-all duration-300 relative"
                            style={{
                                aspectRatio: `${ratioW} / ${ratioH}`,
                                width: parseFloat(ratioW) >= parseFloat(ratioH) ? '100%' : 'auto',
                                height: parseFloat(ratioW) < parseFloat(ratioH) ? '100%' : 'auto',
                                maxHeight: '300px',
                                maxWidth: '100%'
                            }}
                        >
                            <div className="text-center p-2">
                                <span className="block text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {ratioW}:{ratioH}
                                </span>
                                <span className="text-xs text-blue-400 dark:text-blue-500">
                                    {width} x {height}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
