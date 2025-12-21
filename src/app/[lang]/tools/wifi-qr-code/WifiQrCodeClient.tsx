'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Wifi, Lock, Eye, EyeOff, Printer, Info } from 'lucide-react';

interface WifiQrCodeClientProps {
    labels: {
        title: string;
        description: string;
        label_ssid: string;
        label_password: string;
        label_encryption: string;
        label_hidden: string;
        label_generate: string;
        label_print: string;
        error_ssid_required: string;
    };
}

export default function WifiQrCodeClient({ labels }: WifiQrCodeClientProps) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [encryption, setEncryption] = useState('WPA');
    const [hidden, setHidden] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Card ref for potential canvas drawing or just for reference, 
    // but generating from data URL is easier for download

    useEffect(() => {
        generateQrCode();
    }, [ssid, password, encryption, hidden]);

    const generateQrCode = async () => {
        if (!ssid) {
            setQrDataUrl(null);
            return;
        }

        // WIFI:T:WPA;S:mynetwork;P:mypass;;
        // Escape special characters in SSID and Password if needed (Use \ for ;, ,, :)
        // Spec: https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
        const escape = (str: string) => str.replace(/([\\;,":])/g, '\\$1');

        const schema = `WIFI:T:${encryption};S:${escape(ssid)};P:${escape(password)};H:${hidden};;`;

        try {
            const url = await QRCode.toDataURL(schema, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            });
            setQrDataUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = () => {
        if (!qrDataUrl) return;

        // Create a temporary canvas to draw the "Card" style with text
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = 400; // QR width
            canvas.height = 550; // QR height + text space

            // Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR
            ctx.drawImage(img, 0, 0);

            // Draw Text
            ctx.font = 'bold 24px sans-serif';
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'center';
            ctx.fillText(ssid, canvas.width / 2, 450);

            if (encryption !== 'nopass') {
                ctx.font = '16px sans-serif';
                ctx.fillStyle = '#555555';
                ctx.fillText(`PW: ${password}`, canvas.width / 2, 490);
            }

            // Decoration (optional Wifi icon or text bottom)
            ctx.font = '12px sans-serif';
            ctx.fillStyle = '#999999';
            ctx.fillText('Scan to Connect', canvas.width / 2, 530);

            // Download
            const link = document.createElement('a');
            link.download = `wifi-qr-${ssid}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        img.src = qrDataUrl;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                        <Wifi className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    {labels.title}
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                {/* Input Panel */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        {/* SSID */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.label_ssid}
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Wifi className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={ssid}
                                    onChange={(e) => setSsid(e.target.value)}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                                    placeholder="e.g., MyHomeWiFi"
                                />
                            </div>
                        </div>

                        {/* Encryption */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {labels.label_encryption}
                            </label>
                            <select
                                value={encryption}
                                onChange={(e) => setEncryption(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="WPA">WPA/WPA2 (Most Common)</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">None (Open Network)</option>
                            </select>
                        </div>

                        {/* Password */}
                        {encryption !== 'nopass' && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {labels.label_password}
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                                        placeholder="Min 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Hidden Toggle */}
                        <div className="flex items-center">
                            <input
                                id="hidden-network"
                                type="checkbox"
                                checked={hidden}
                                onChange={(e) => setHidden(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="hidden-network" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                {labels.label_hidden}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    {!ssid ? (
                        <div className="text-center text-gray-400">
                            <Wifi className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>{labels.error_ssid_required}</p>
                        </div>
                    ) : qrDataUrl ? (
                        <div className="flex flex-col items-center space-y-8">
                            {/* Printable Card Preview */}
                            <div className="bg-white p-6 rounded-xl shadow-xl transform transition-transform hover:scale-105 duration-300 border border-gray-100 dark:border-gray-900">
                                <h3 className="text-center text-sm font-bold text-gray-400 mb-2 tracking-widest uppercase">WiFi Access</h3>
                                <img src={qrDataUrl} alt="WiFi QR Code" className="w-64 h-64 object-contain mx-auto" />
                                <div className="mt-6 text-center">
                                    <p className="font-bold text-xl text-gray-900">{ssid}</p>
                                    {encryption !== 'nopass' && (
                                        <p className="text-gray-500 mt-1 font-mono text-sm">{password}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                {labels.label_print}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-200 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
