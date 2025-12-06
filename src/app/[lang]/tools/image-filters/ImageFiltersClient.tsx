'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Sliders, Palette, X } from 'lucide-react';

interface ImageFiltersClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        filters: string;
        adjustments: string;
        brightness: string;
        contrast: string;
        saturation: string;
        grayscale: string;
        sepia: string;
        blur: string;
        download: string;
        reset: string;
    };
}

interface FilterSettings {
    brightness: number;
    contrast: number;
    saturation: number;
    grayscale: number;
    sepia: number;
    blur: number;
}

const DEFAULT_SETTINGS: FilterSettings = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
    sepia: 0,
    blur: 0,
};

export default function ImageFiltersClient({ labels }: ImageFiltersClientProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [settings, setSettings] = useState<FilterSettings>(DEFAULT_SETTINGS);
    const [activeTab, setActiveTab] = useState<'adjustments' | 'filters'>('adjustments');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result as string);
                setSettings(DEFAULT_SETTINGS);
            });
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    setImageSrc(reader.result as string);
                    setSettings(DEFAULT_SETTINGS);
                });
                reader.readAsDataURL(file);
            }
        }
    };

    useEffect(() => {
        if (imageSrc && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                if (ctx) {
                    // Apply filters
                    ctx.filter = `
                        brightness(${settings.brightness}%)
                        contrast(${settings.contrast}%)
                        saturate(${settings.saturation}%)
                        grayscale(${settings.grayscale}%)
                        sepia(${settings.sepia}%)
                        blur(${settings.blur}px)
                    `;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                }
            };
            img.src = imageSrc;
        }
    }, [imageSrc, settings]);

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'filtered-image.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const handleClear = () => {
        setImageSrc(null);
        setSettings(DEFAULT_SETTINGS);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Palette className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            {!imageSrc ? (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="max-w-2xl mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-white dark:bg-gray-800"
                >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        {labels.drop_zone}
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Preview Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex items-center justify-center">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[600px] object-contain"
                            />
                            <button
                                onClick={handleClear}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-fit">
                        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => setActiveTab('adjustments')}
                                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'adjustments'
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Sliders className="w-4 h-4 mr-2" />
                                {labels.adjustments}
                            </button>
                            <button
                                onClick={() => setActiveTab('filters')}
                                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'filters'
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Palette className="w-4 h-4 mr-2" />
                                {labels.filters}
                            </button>
                        </div>

                        <div className="flex-1 space-y-6 mb-8">
                            {activeTab === 'adjustments' ? (
                                <>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.brightness}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.brightness}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200"
                                            value={settings.brightness}
                                            onChange={(e) => setSettings({ ...settings, brightness: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.contrast}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.contrast}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200"
                                            value={settings.contrast}
                                            onChange={(e) => setSettings({ ...settings, contrast: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.saturation}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.saturation}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200"
                                            value={settings.saturation}
                                            onChange={(e) => setSettings({ ...settings, saturation: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.grayscale}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.grayscale}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.grayscale}
                                            onChange={(e) => setSettings({ ...settings, grayscale: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.sepia}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.sepia}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.sepia}
                                            onChange={(e) => setSettings({ ...settings, sepia: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {labels.blur}
                                            </label>
                                            <span className="text-sm text-gray-500">{settings.blur}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            value={settings.blur}
                                            onChange={(e) => setSettings({ ...settings, blur: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleReset}
                                className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {labels.reset}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                <Download className="w-5 h-5" />
                                {labels.download}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
