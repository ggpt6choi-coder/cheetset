'use client';

import React, { useState, useEffect } from 'react';
import { Address4 } from 'ip-address';
import { Network, Calculator, Binary, Copy, Check } from 'lucide-react';

interface SubnetCalculatorClientProps {
    labels: {
        title: string;
        description: string;
        ip_label: string;
        cidr_label: string;
        calculate_button: string;
        result_network: string;
        result_broadcast: string;
        result_netmask: string;
        result_first_ip: string;
        result_last_ip: string;
        result_hosts: string;
        result_binary_ip: string;
        result_binary_mask: string;
        error_invalid_ip: string;
    };
}

export default function SubnetCalculatorClient({ labels }: SubnetCalculatorClientProps) {
    const [ip, setIp] = useState('192.168.0.1');
    const [cidr, setCidr] = useState(24);
    const [result, setResult] = useState<{
        networkAddress: string;
        broadcastAddress: string;
        subnetMask: string;
        firstIp: string;
        lastIp: string;
        numHosts: string;
        binaryIp: string;
        binaryMask: string;
    } | null>(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const calculateSubnet = () => {
        setError('');
        try {
            if (!Address4.isValid(ip)) {
                setError(labels.error_invalid_ip);
                setResult(null);
                return;
            }

            const address = new Address4(`${ip}/${cidr}`);

            // Calculate binary representations manually for better visualization
            const ipBinary = ip.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.');

            // Calculate subnet mask manually
            const maskParts = [];
            let remainingCidr = cidr;
            for (let i = 0; i < 4; i++) {
                const bits = Math.min(remainingCidr, 8);
                maskParts.push(256 - Math.pow(2, 8 - bits));
                remainingCidr -= bits;
            }
            const mask = maskParts.join('.');
            const maskBinary = maskParts.map(octet => octet.toString(2).padStart(8, '0')).join('.');

            // Calculate hosts
            const hosts = Math.pow(2, 32 - cidr) - 2;

            setResult({
                networkAddress: address.startAddress().address,
                broadcastAddress: address.endAddress().address,
                subnetMask: mask,
                firstIp: address.startAddress().address,
                lastIp: address.endAddress().address,
                numHosts: (hosts > 0 ? hosts : 0).toLocaleString(),
                binaryIp: ipBinary,
                binaryMask: maskBinary
            });
        } catch (e) {
            setError(labels.error_invalid_ip);
            setResult(null);
        }
    };

    useEffect(() => {
        calculateSubnet();
    }, []);

    const handleCopy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const ResultRow = ({ label, value, copyKey, isBinary = false }: { label: string, value: string, copyKey: string, isBinary?: boolean }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors group">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-0">{label}</span>
            <div className="flex items-center gap-3">
                <span className={`font-mono font-semibold text-gray-900 dark:text-white ${isBinary ? 'text-xs sm:text-sm tracking-wider text-indigo-600 dark:text-indigo-400' : 'text-lg'}`}>
                    {value}
                </span>
                <button
                    onClick={() => handleCopy(value, copyKey)}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy"
                >
                    {copied === copyKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <Network className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.ip_label}
                        </label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.0.1"
                            className={`w-full px-4 py-2 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.cidr_label}
                        </label>
                        <select
                            value={cidr}
                            onChange={(e) => setCidr(Number(e.target.value))}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {Array.from({ length: 33 }, (_, i) => (
                                <option key={i} value={i}>/{i}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={calculateSubnet}
                        className="w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        <Calculator className="w-5 h-5" />
                        {labels.calculate_button}
                    </button>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 space-y-4">
                    {result && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                            <ResultRow label={labels.result_network} value={result.networkAddress} copyKey="network" />
                            <ResultRow label={labels.result_broadcast} value={result.broadcastAddress} copyKey="broadcast" />
                            <ResultRow label={labels.result_netmask} value={result.subnetMask} copyKey="netmask" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                    <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">{labels.result_first_ip}</span>
                                    <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mt-1 font-mono">{result.firstIp}</p>
                                </div>
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                    <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">{labels.result_last_ip}</span>
                                    <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mt-1 font-mono">{result.lastIp}</p>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex items-center justify-between">
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">{labels.result_hosts}</span>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{result.numHosts}</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Binary className="w-4 h-4" />
                                    Binary Visualization
                                </h3>
                                <div className="space-y-3">
                                    <ResultRow label={labels.result_binary_ip} value={result.binaryIp} copyKey="bin_ip" isBinary />
                                    <ResultRow label={labels.result_binary_mask} value={result.binaryMask} copyKey="bin_mask" isBinary />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
