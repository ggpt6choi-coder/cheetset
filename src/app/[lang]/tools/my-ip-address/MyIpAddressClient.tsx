'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Globe, Monitor, Smartphone, Cpu, MapPin, Maximize } from 'lucide-react';
import { UAParser } from 'ua-parser-js';

interface MyIpAddressClientProps {
    labels: {
        title: string;
        description: string;
        label_ip: string;
        label_location: string;
        label_os: string;
        label_browser: string;
        label_device: string;
        label_screen: string;
        label_copy: string;
        label_copied: string;
        privacy_notice: string;
        error_fetch_ip: string;
    };
}

export default function MyIpAddressClient({ labels }: MyIpAddressClientProps) {
    const [ip, setIp] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [uaInfo, setUaInfo] = useState<any>(null);
    const [screenSize, setScreenSize] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                // Fetch IP
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                setIp(ipData.ip);

                // Try fetching location (best effort, client-side only)
                try {
                    const geoRes = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
                    if (geoRes.ok) {
                        const geoData = await geoRes.json();
                        if (geoData.city && geoData.country_name) {
                            setLocation(`${geoData.city}, ${geoData.country_name}`);
                        }
                    }
                } catch (e) {
                    console.warn('Failed to fetch location', e);
                }

                // Parse UA
                const parser = new UAParser();
                setUaInfo(parser.getResult());

                // Screen Size
                setScreenSize(`${window.screen.width} x ${window.screen.height}`);
            } catch (err) {
                setError(labels.error_fetch_ip);
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [labels.error_fetch_ip]);

    const handleCopy = () => {
        if (ip) {
            navigator.clipboard.writeText(ip);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    {labels.title}
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Main IP Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-8 text-center">
                        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            {labels.label_ip}
                        </h2>
                        {loading ? (
                            <div className="h-16 w-64 mx-auto bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                        ) : error ? (
                            <div className="text-red-500 text-xl font-medium">{error}</div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <span className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight font-mono">
                                    {ip}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                    {copied ? labels.label_copied : labels.label_copy}
                                </button>
                            </div>
                        )}
                        {location && (
                            <div className="mt-4 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                <MapPin className="w-4 h-4 mr-1" />
                                {location}
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {labels.privacy_notice}
                        </p>
                    </div>
                </div>

                {/* Details Grid */}
                {!loading && uaInfo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Monitor className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{labels.label_os}</h3>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    {uaInfo.os.name} {uaInfo.os.version}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{labels.label_browser}</h3>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    {uaInfo.browser.name} {uaInfo.browser.major}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <Cpu className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{labels.label_device}</h3>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    {uaInfo.device.model ? `${uaInfo.device.vendor} ${uaInfo.device.model}` : (uaInfo.device.type === 'mobile' ? 'Mobile' : 'Desktop')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                <Maximize className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{labels.label_screen}</h3>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    {screenSize}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
