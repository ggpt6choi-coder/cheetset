'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface PasswordGeneratorClientProps {
    labels: {
        title: string;
        description: string;
        password_length: string;
        include_uppercase: string;
        include_lowercase: string;
        include_numbers: string;
        include_symbols: string;
        generate: string;
        copy: string;
        copied: string;
        strength: string;
        weak: string;
        medium: string;
        strong: string;
    };
    lang: string;
}

export default function PasswordGeneratorClient({ labels }: PasswordGeneratorClientProps) {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('strong');

    const generatePassword = useCallback(() => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
        };

        let chars = '';
        if (options.uppercase) chars += charset.uppercase;
        if (options.lowercase) chars += charset.lowercase;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (chars === '') {
            setPassword('');
            return;
        }

        let generatedPassword = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            generatedPassword += chars[array[i] % chars.length];
        }

        setPassword(generatedPassword);
        calculateStrength(generatedPassword);
    }, [length, options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const calculateStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score < 3) setStrength('weak');
        else if (score < 5) setStrength('medium');
        else setStrength('strong');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 'weak': return 'bg-red-500 text-red-500';
            case 'medium': return 'bg-yellow-500 text-yellow-500';
            case 'strong': return 'bg-green-500 text-green-500';
        }
    };

    const getStrengthLabel = () => {
        switch (strength) {
            case 'weak': return labels.weak;
            case 'medium': return labels.medium;
            case 'strong': return labels.strong;
        }
    };

    const getStrengthIcon = () => {
        switch (strength) {
            case 'weak': return ShieldAlert;
            case 'medium': return Shield;
            case 'strong': return ShieldCheck;
        }
    };

    const StrengthIcon = getStrengthIcon();

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Password Display */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative group">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 font-mono text-2xl md:text-4xl break-all font-bold text-gray-800 dark:text-gray-100 tracking-wider">
                        {password}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                        aria-label={labels.copy}
                    >
                        {copied ? <Check className="text-green-500" size={24} /> : <Copy className="text-gray-500 dark:text-gray-400" size={24} />}
                    </button>
                </div>
                {copied && (
                    <div className="absolute top-2 right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {labels.copied}
                    </div>
                )}
            </div>

            {/* Strength Meter */}
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${getStrengthColor().split(' ')[0]}`}
                        style={{ width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' }}
                    />
                </div>
                <div className={`flex items-center gap-2 font-bold ${getStrengthColor().split(' ')[1]}`}>
                    <StrengthIcon size={20} />
                    <span>{getStrengthLabel()}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-8">
                {/* Length Slider */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="font-medium text-gray-700 dark:text-gray-300">
                            {labels.password_length}
                        </label>
                        <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-lg font-mono font-bold">
                            {length}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="4"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                    />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { key: 'uppercase', label: labels.include_uppercase },
                        { key: 'lowercase', label: labels.include_lowercase },
                        { key: 'numbers', label: labels.include_numbers },
                        { key: 'symbols', label: labels.include_symbols },
                    ].map((opt) => (
                        <label key={opt.key} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={options[opt.key as keyof typeof options]}
                                onChange={() => setOptions(prev => ({ ...prev, [opt.key]: !prev[opt.key as keyof typeof options] }))}
                                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{opt.label}</span>
                        </label>
                    ))}
                </div>

                {/* Generate Button */}
                <button
                    onClick={generatePassword}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <RefreshCw size={24} />
                    {labels.generate}
                </button>
            </div>
        </div>
    );
}
