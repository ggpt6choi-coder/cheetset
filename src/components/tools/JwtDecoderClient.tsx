'use client';

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface JwtDecoderClientProps {
    labels: {
        title: string;
        description: string;
        placeholder: string;
        header_label: string;
        payload_label: string;
        signature_label: string;
        error_invalid: string;
        privacy_alert: string;
    };
}

export default function JwtDecoderClient({ labels }: JwtDecoderClientProps) {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<string | null>(null);
    const [payload, setPayload] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setError(null);
            return;
        }

        try {
            // Decode Payload
            const decodedPayload = jwtDecode(token);
            setPayload(JSON.stringify(decodedPayload, null, 2));

            // Decode Header (jwt-decode allows decoding header too)
            const decodedHeader = jwtDecode(token, { header: true });
            setHeader(JSON.stringify(decodedHeader, null, 2));

            setError(null);
        } catch (err) {
            setError(labels.error_invalid);
            setHeader(null);
            setPayload(null);
        }
    }, [token, labels.error_invalid]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Privacy Alert */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    {labels.privacy_alert}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        JWT Token
                    </label>
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder={labels.placeholder}
                        className="w-full h-[500px] px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    />
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-red-600 dark:text-red-400">
                            {labels.header_label}
                        </label>
                        <pre className="w-full p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-gray-900 dark:text-gray-100 font-mono text-sm overflow-auto max-h-[200px]">
                            {header || '{}'}
                        </pre>
                    </div>

                    {/* Payload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-purple-600 dark:text-purple-400">
                            {labels.payload_label}
                        </label>
                        <pre className="w-full p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/10 text-gray-900 dark:text-gray-100 font-mono text-sm overflow-auto max-h-[300px]">
                            {payload || '{}'}
                        </pre>
                    </div>

                    {/* Signature (Visual Only) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-600 dark:text-blue-400">
                            {labels.signature_label}
                        </label>
                        <div className="w-full p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 text-blue-400 font-mono text-sm break-all">
                            HMACSHA256(
                            base64UrlEncode(header) + "." +
                            base64UrlEncode(payload),
                            your-256-bit-secret
                            )
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
