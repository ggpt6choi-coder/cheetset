'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, FileImage, ArrowRight, RefreshCw, Image as ImageIcon, Settings } from 'lucide-react';

interface ImageCompressorClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        drop_zone_sub: string;
        compressing: string;
        download: string;
        original_size: string;
        compressed_size: string;
        quality_label: string;
        max_width_label: string;
        compress_button: string;
        reset_button: string;
        saved_label: string;
    };
}

export default function ImageCompressorClient({ labels }: ImageCompressorClientProps) {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Options
    const [quality, setQuality] = useState(0.8); // 0 to 1
    const [maxWidth, setMaxWidth] = useState(1920);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setOriginalFile(file);
            setCompressedFile(null);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setOriginalFile(file);
                setCompressedFile(null);
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const compressImage = async () => {
        if (!originalFile) return;

        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: 1, // initial guess, not strictly used if quality is set, but required by lib types sometimes
                maxWidthOrHeight: maxWidth,
                useWebWorker: true,
                initialQuality: quality,
            };

            // The library's maxSizeMB is a bit tricky. If we want to control quality directly, 
            // we might need to rely on initialQuality. 
            // For this simple tool, let's trust the library's quality handling.

            const compressed = await imageCompression(originalFile, options);
            setCompressedFile(compressed);
        } catch (error) {
            console.error('Compression failed:', error);
            alert('Compression failed. Please try another image.');
        } finally {
            setIsCompressing(false);
        }
    };

    const formatSize = (size: number) => {
        if (size === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getSavings = () => {
        if (!originalFile || !compressedFile) return 0;
        const saved = originalFile.size - compressedFile.size;
        return Math.round((saved / originalFile.size) * 100);
    };

    const downloadImage = () => {
        if (!compressedFile) return;
        const url = URL.createObjectURL(compressedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = `compressed_${originalFile?.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setOriginalFile(null);
        setCompressedFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            {!originalFile ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-sky-500 dark:hover:border-sky-500 transition-colors cursor-pointer bg-white dark:bg-gray-800"
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                        <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-6 text-sky-500">
                            <Upload className="w-10 h-10" />
                        </div>
                        <span className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                            {labels.drop_zone}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {labels.drop_zone_sub}
                        </span>
                    </label>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Controls */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                            <Settings className="w-5 h-5 text-sky-500" />
                            Options
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.quality_label}: {Math.round(quality * 100)}%
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => {
                                        setQuality(parseFloat(e.target.value));
                                        setCompressedFile(null); // Reset compressed file when options change
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Low Quality</span>
                                    <span>High Quality</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.max_width_label} (px)
                                </label>
                                <input
                                    type="number"
                                    value={maxWidth}
                                    onChange={(e) => {
                                        setMaxWidth(parseInt(e.target.value) || 1920);
                                        setCompressedFile(null);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={reset}
                                className="px-6 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {labels.reset_button}
                            </button>
                            <button
                                onClick={compressImage}
                                disabled={isCompressing}
                                className="px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors shadow-lg shadow-sky-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCompressing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        {labels.compressing}
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="w-5 h-5" />
                                        {labels.compress_button}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Original */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-medium text-gray-900 dark:text-white">Original</span>
                                <span className="text-sm text-gray-500">{formatSize(originalFile.size)}</span>
                            </div>
                            <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative">
                                {previewUrl && (
                                    <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                                )}
                            </div>
                        </div>

                        {/* Compressed */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                            {compressedFile ? (
                                <>
                                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                                        -{getSavings()}% {labels.saved_label}
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-medium text-gray-900 dark:text-white">Compressed</span>
                                        <span className="text-sm text-green-600 font-bold">{formatSize(compressedFile.size)}</span>
                                    </div>
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative mb-4">
                                        <img src={URL.createObjectURL(compressedFile)} alt="Compressed" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <button
                                        onClick={downloadImage}
                                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        {labels.download}
                                    </button>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                    <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                                    <p>Click "Compress Image" to see the result</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
