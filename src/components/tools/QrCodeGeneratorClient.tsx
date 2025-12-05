'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, RefreshCw } from 'lucide-react';

type Props = {
    labels: {
        title: string;
        description: string;
        input_label: string;
        placeholder: string;
        options: string;
        size: string;
        color_dark: string;
        color_light: string;
        download: string;
    };
};

export default function QrCodeGeneratorClient({ labels }: Props) {
    const [text, setText] = useState('');
    const [size, setSize] = useState(300);
    const [darkColor, setDarkColor] = useState('#000000');
    const [lightColor, setLightColor] = useState('#ffffff');
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        generateQR();
    }, [text, size, darkColor, lightColor]);

    const generateQR = async () => {
        if (!text) {
            setQrDataUrl(null);
            return;
        }

        try {
            const url = await QRCode.toDataURL(text, {
                width: size,
                margin: 1,
                color: {
                    dark: darkColor,
                    light: lightColor,
                },
            });
            setQrDataUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    {labels.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {labels.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 border border-gray-100 dark:border-gray-700">
                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {labels.input_label}
                        </label>
                        <textarea
                            id="content"
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                            placeholder={labels.placeholder}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">
                            {labels.options}
                        </h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {labels.size} ({size}px)
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="10"
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {labels.color_dark}
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={darkColor}
                                        onChange={(e) => setDarkColor(e.target.value)}
                                        className="h-10 w-full rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {labels.color_light}
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={lightColor}
                                        onChange={(e) => setLightColor(e.target.value)}
                                        className="h-10 w-full rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center space-y-6 border border-gray-100 dark:border-gray-700 min-h-[400px]">
                    {qrDataUrl ? (
                        <>
                            <div className="relative group">
                                <img
                                    src={qrDataUrl}
                                    alt="Generated QR Code"
                                    className="max-w-full h-auto border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm"
                                    style={{ maxHeight: '300px' }}
                                />
                            </div>
                            <button
                                onClick={handleDownload}
                                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                {labels.download}
                            </button>
                        </>
                    ) : (
                        <div className="text-center text-gray-400 dark:text-gray-500">
                            <RefreshCw className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>{labels.input_label}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
