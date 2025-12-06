'use client';

import { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Upload, Download, RefreshCw, X } from 'lucide-react';

interface ImageResizerClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        width: string;
        height: string;
        format: string;
        quality: string;
        maintain_aspect_ratio: string;
        convert: string;
        download: string;
        reset: string;
    };
}

export default function ImageResizerClient({ labels }: ImageResizerClientProps) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
    const [quality, setQuality] = useState<number>(0.9);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [originalAspectRatio, setOriginalAspectRatio] = useState(1);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            loadImage(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            loadImage(file);
        }
    };

    const loadImage = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        const img = new Image();
        img.onload = () => {
            setImage(img);
            setWidth(img.width);
            setHeight(img.height);
            setOriginalAspectRatio(img.width / img.height);
            setConvertedUrl(null);
        };
        img.src = url;
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value) || 0;
        setWidth(newWidth);
        if (maintainAspectRatio) {
            setHeight(Math.round(newWidth / originalAspectRatio));
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseInt(e.target.value) || 0;
        setHeight(newHeight);
        if (maintainAspectRatio) {
            setWidth(Math.round(newHeight * originalAspectRatio));
        }
    };

    const handleConvert = () => {
        if (!image || !canvasRef.current) return;

        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        // Draw image to canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Convert to blob/data URL
        const dataUrl = canvas.toDataURL(format, quality);
        setConvertedUrl(dataUrl);
        setIsProcessing(false);
    };

    const handleDownload = () => {
        if (!convertedUrl) return;

        const link = document.createElement('a');
        link.href = convertedUrl;
        const ext = format.split('/')[1];
        link.download = `resized-image.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReset = () => {
        setImage(null);
        setPreviewUrl(null);
        setConvertedUrl(null);
        setWidth(0);
        setHeight(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <ImageIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
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
                    {!previewUrl ? (
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-white dark:bg-gray-800"
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
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-[300px] object-contain"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {labels.width}
                                        </label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={handleWidthChange}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {labels.height}
                                        </label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={handleHeightChange}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="aspect-ratio"
                                        type="checkbox"
                                        checked={maintainAspectRatio}
                                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="aspect-ratio" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        {labels.maintain_aspect_ratio}
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {labels.format}
                                    </label>
                                    <select
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value as any)}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="image/jpeg">JPG</option>
                                        <option value="image/png">PNG</option>
                                        <option value="image/webp">WebP</option>
                                    </select>
                                </div>

                                {format !== 'image/png' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {labels.quality} ({Math.round(quality * 100)}%)
                                        </label>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1"
                                            step="0.1"
                                            value={quality}
                                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={handleConvert}
                                    disabled={isProcessing}
                                    className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <RefreshCw className="w-5 h-5" />
                                    )}
                                    {labels.convert}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center min-h-[400px]">
                    {convertedUrl ? (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-300 w-full">
                            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-[300px]">
                                <img
                                    src={convertedUrl}
                                    alt="Converted"
                                    className="max-w-full max-h-[400px] object-contain"
                                />
                            </div>
                            <button
                                onClick={handleDownload}
                                className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200 dark:shadow-none"
                            >
                                <Download className="w-5 h-5" />
                                {labels.download}
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 dark:text-gray-500 space-y-4">
                            <ImageIcon className="w-16 h-16 mx-auto opacity-50" />
                            <p className="text-lg">
                                {previewUrl ? 'Click Convert to see result' : 'Upload an image to start'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
