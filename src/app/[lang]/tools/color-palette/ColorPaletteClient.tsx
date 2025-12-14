'use client';

import React, { useState, useRef } from 'react';
import { Palette, Upload, Copy, Check, Image as ImageIcon } from 'lucide-react';
import ColorThief from 'colorthief';

interface ColorPaletteClientProps {
    labels: {
        title: string;
        description: string;
        upload_label: string;
        palette_label: string;
        copy_hex: string;
        copy_rgb: string;
        copied: string;
    };
}

type Color = {
    rgb: [number, number, number];
    hex: string;
};

export default function ColorPaletteClient({ labels }: ColorPaletteClientProps) {
    const [image, setImage] = useState<string | null>(null);
    const [colors, setColors] = useState<Color[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    };

    const extractColors = (imgSrc: string) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgSrc;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 6); // Extract 6 colors

                const extractedColors = palette.map((rgb: [number, number, number]) => ({
                    rgb,
                    hex: rgbToHex(rgb[0], rgb[1], rgb[2])
                }));

                setColors(extractedColors);
            } catch (error) {
                console.error('Error extracting colors:', error);
            }
        };
    };

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImage(result);
                extractColors(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <Palette className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isDragging
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                            }`}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {image ? (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={imgRef}
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                    Click or Drop to Change Image
                                </div>
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                                <Upload className="w-12 h-12 mb-4 text-gray-400" />
                                <p className="text-lg font-medium mb-2">{labels.upload_label}</p>
                                <p className="text-sm">JPG, PNG, WEBP supported</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Palette Section */}
                <div className="space-y-6">
                    {colors.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                {labels.palette_label}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                                    >
                                        <div
                                            className="w-16 h-16 rounded-lg shadow-sm shrink-0"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <button
                                                onClick={() => copyToClipboard(color.hex, index)}
                                                className="w-full text-left mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-between"
                                            >
                                                <span className="font-mono font-bold text-lg truncate">
                                                    {color.hex}
                                                </span>
                                                {copiedIndex === index ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                                                )}
                                            </button>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                                rgb({color.rgb.join(', ')})
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 text-center">
                            <div>
                                <Palette className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>Upload an image to generate a palette</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
