'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Download, RefreshCw, X, FileImage, AlertCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface Props {
    dict: any;
}

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    convertedBlob?: Blob;
    status: 'idle' | 'converting' | 'done' | 'error';
    originalSize: number;
    convertedSize?: number;
    errorMessage?: string;
}

export default function ImageConverterClient({ dict }: Props) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
    const [quality, setQuality] = useState<number>(0.8);
    const [isDragging, setIsDragging] = useState(false);
    const [heic2any, setHeic2any] = useState<any>(null);

    useEffect(() => {
        // Dynamically import heic2any only on client side
        import('heic2any').then((module) => {
            setHeic2any(() => module.default);
        }).catch(err => console.error("Failed to load heic2any", err));
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback(async (files: File[]) => {
        const newImages: ImageFile[] = [];

        for (const file of files) {
            let preview = '';

            if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                // HEIC preview logic would go here if needed, but for now we just show a placeholder
                // or try to convert immediately for preview. 
                // For simplicity in this step, we'll use a generic icon or try to convert if heic2any is loaded.
                if (heic2any) {
                    try {
                        const blob = await heic2any({ blob: file, toType: 'image/jpeg' });
                        preview = URL.createObjectURL(Array.isArray(blob) ? blob[0] : blob);
                    } catch (e) {
                        console.error("HEIC preview error", e);
                        // Fallback to a generic icon if preview fails
                    }
                }
            } else {
                preview = URL.createObjectURL(file);
            }

            newImages.push({
                id: Math.random().toString(36).substr(2, 9),
                file,
                preview,
                status: 'idle',
                originalSize: file.size
            });
        }

        setImages(prev => [...prev, ...newImages]);
    }, [heic2any]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic')
        );
        processFiles(files);
    }, [processFiles]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            processFiles(files);
        }
    }, [processFiles]);

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const convertImages = async () => {
        const newImages = [...images];

        for (let i = 0; i < newImages.length; i++) {
            if (newImages[i].status === 'done') continue;

            newImages[i].status = 'converting';
            newImages[i].errorMessage = undefined;
            setImages([...newImages]);

            try {
                let sourceFile = newImages[i].file;

                // Handle HEIC conversion first
                if (sourceFile.type === 'image/heic' || sourceFile.name.toLowerCase().endsWith('.heic')) {
                    if (!heic2any) {
                        throw new Error('HEIC converter not loaded yet. Please try again in a moment.');
                    }

                    // Ensure blob has type
                    const blobToConvert = sourceFile.type ? sourceFile : new Blob([sourceFile], { type: 'image/heic' });

                    const blob = await heic2any({
                        blob: blobToConvert,
                        toType: 'image/jpeg',
                        quality: 0.9
                    });

                    sourceFile = new File(
                        [Array.isArray(blob) ? blob[0] : blob],
                        sourceFile.name.replace(/\.heic$/i, '.jpg'),
                        { type: 'image/jpeg' }
                    );
                }

                const options = {
                    maxSizeMB: 10, // No strict limit, just high enough
                    maxWidthOrHeight: 4096, // Reasonable limit
                    useWebWorker: true,
                    fileType: targetFormat,
                    initialQuality: quality
                };

                const compressedFile = await imageCompression(sourceFile, options);

                newImages[i].convertedBlob = compressedFile;
                newImages[i].convertedSize = compressedFile.size;
                newImages[i].status = 'done';
            } catch (error: any) {
                console.error('Conversion error:', error);
                newImages[i].status = 'error';
                newImages[i].errorMessage = error.message || 'Conversion failed';
            }

            setImages([...newImages]);
        }
    };

    const downloadImage = (image: ImageFile) => {
        if (!image.convertedBlob) return;

        const extension = targetFormat.split('/')[1];
        const fileName = image.file.name.replace(/\.[^/.]+$/, "") + `_converted.${extension}`;
        const url = URL.createObjectURL(image.convertedBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {dict.tools.image_converter.format}
                        </label>
                        <select
                            value={targetFormat}
                            onChange={(e) => setTargetFormat(e.target.value as any)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="image/jpeg">JPG / JPEG</option>
                            <option value="image/png">PNG</option>
                            <option value="image/webp">WebP</option>
                        </select>
                    </div>

                    {targetFormat !== 'image/png' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {dict.tools.image_converter.quality} ({Math.round(quality * 100)}%)
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
                </div>
            </div>

            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                    }
                `}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*,.heic"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center pointer-events-none">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {dict.tools.image_converter.drop_zone}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        JPG, PNG, WebP, HEIC
                    </p>
                </div>
            </div>

            {/* Image List */}
            {images.length > 0 && (
                <div className="space-y-4">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 relative">
                                {image.preview ? (
                                    <img src={image.preview} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <FileImage className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {image.file.name}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{formatSize(image.originalSize)}</span>
                                    {image.convertedSize && (
                                        <>
                                            <span>→</span>
                                            <span className="text-green-600 dark:text-green-400 font-medium">
                                                {formatSize(image.convertedSize)}
                                            </span>
                                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded">
                                                {Math.round((1 - image.convertedSize / image.originalSize) * 100)}% saved
                                            </span>
                                        </>
                                    )}
                                </div>
                                {image.errorMessage && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {image.errorMessage}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {image.status === 'converting' && (
                                    <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                                )}
                                {image.status === 'error' && (
                                    <div className="group relative">
                                        <AlertCircle className="w-5 h-5 text-red-500 cursor-help" />
                                        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-red-50 text-red-600 text-xs rounded shadow-lg border border-red-100 z-10">
                                            {image.errorMessage || dict.tools.image_converter.error}
                                        </div>
                                    </div>
                                )}
                                {image.status === 'done' && (
                                    <button
                                        onClick={() => downloadImage(image)}
                                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                        title={dict.tools.image_converter.download}
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => setImages([])}
                            className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors"
                        >
                            {dict.tools.image_converter.reset}
                        </button>
                        <button
                            onClick={convertImages}
                            disabled={images.some(img => img.status === 'converting') || images.every(img => img.status === 'done')}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {images.some(img => img.status === 'converting') ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    {dict.tools.image_converter.converting}
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-5 h-5" />
                                    {dict.tools.image_converter.convert}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
