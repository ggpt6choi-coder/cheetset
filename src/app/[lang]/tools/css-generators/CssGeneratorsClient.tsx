'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Layers, Palette, Droplets } from 'lucide-react';

interface CssGeneratorsClientProps {
    labels: {
        title: string;
        description: string;
        tab_shadow: string;
        tab_gradient: string;
        tab_glass: string;
        shadow_opt_shift_right: string;
        shadow_opt_shift_down: string;
        shadow_opt_blur: string;
        shadow_opt_spread: string;
        shadow_opt_opacity: string;
        gradient_type: string;
        gradient_linear: string;
        gradient_radial: string;
        gradient_angle: string;
        glass_blur: string;
        glass_transparency: string;
        glass_outline: string;
        copy_css: string;
        copied: string;
    };
}

type Tab = 'shadow' | 'gradient' | 'glass';

export default function CssGeneratorsClient({ labels }: CssGeneratorsClientProps) {
    const [activeTab, setActiveTab] = useState<Tab>('shadow');
    const [copied, setCopied] = useState(false);

    // Box Shadow State
    const [shadow, setShadow] = useState({
        shiftRight: 0,
        shiftDown: 10,
        blur: 20,
        spread: 0,
        opacity: 0.2,
        color: '#000000'
    });

    // Gradient State
    const [gradient, setGradient] = useState({
        type: 'linear',
        angle: 135,
        color1: '#6366f1',
        color2: '#a855f7'
    });

    // Glassmorphism State
    const [glass, setGlass] = useState({
        blur: 10,
        transparency: 0.2,
        outline: 0.3
    });

    const [generatedCss, setGeneratedCss] = useState('');

    useEffect(() => {
        let css = '';
        if (activeTab === 'shadow') {
            const rgbaColor = `rgba(${parseInt(shadow.color.slice(1, 3), 16)}, ${parseInt(shadow.color.slice(3, 5), 16)}, ${parseInt(shadow.color.slice(5, 7), 16)}, ${shadow.opacity})`;
            css = `box-shadow: ${shadow.shiftRight}px ${shadow.shiftDown}px ${shadow.blur}px ${shadow.spread}px ${rgbaColor};`;
        } else if (activeTab === 'gradient') {
            if (gradient.type === 'linear') {
                css = `background: linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2});`;
            } else {
                css = `background: radial-gradient(circle, ${gradient.color1}, ${gradient.color2});`;
            }
        } else if (activeTab === 'glass') {
            css = `background: rgba(255, 255, 255, ${glass.transparency});\nbackdrop-filter: blur(${glass.blur}px);\n-webkit-backdrop-filter: blur(${glass.blur}px);\nborder: 1px solid rgba(255, 255, 255, ${glass.outline});`;
        }
        setGeneratedCss(css);
    }, [activeTab, shadow, gradient, glass]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCss);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    {labels.title}
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Controls Section */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Tabs */}
                    <div className="flex p-1 space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <button
                            onClick={() => setActiveTab('shadow')}
                            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 transition-all
                                ${activeTab === 'shadow'
                                    ? 'bg-white dark:bg-gray-700 shadow text-indigo-700 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-indigo-600'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Layers className="w-4 h-4" />
                                {labels.tab_shadow}
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('gradient')}
                            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 transition-all
                                ${activeTab === 'gradient'
                                    ? 'bg-white dark:bg-gray-700 shadow text-indigo-700 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-indigo-600'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Palette className="w-4 h-4" />
                                {labels.tab_gradient}
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('glass')}
                            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 transition-all
                                ${activeTab === 'glass'
                                    ? 'bg-white dark:bg-gray-700 shadow text-indigo-700 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-indigo-600'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Droplets className="w-4 h-4" />
                                {labels.tab_glass}
                            </div>
                        </button>
                    </div>

                    {/* Sliders & Inputs */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
                        {activeTab === 'shadow' && (
                            <>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.shadow_opt_shift_right} ({shadow.shiftRight}px)
                                    </label>
                                    <input type="range" min="-50" max="50" value={shadow.shiftRight} onChange={(e) => setShadow({ ...shadow, shiftRight: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.shadow_opt_shift_down} ({shadow.shiftDown}px)
                                    </label>
                                    <input type="range" min="-50" max="50" value={shadow.shiftDown} onChange={(e) => setShadow({ ...shadow, shiftDown: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.shadow_opt_blur} ({shadow.blur}px)
                                    </label>
                                    <input type="range" min="0" max="100" value={shadow.blur} onChange={(e) => setShadow({ ...shadow, blur: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.shadow_opt_spread} ({shadow.spread}px)
                                    </label>
                                    <input type="range" min="-50" max="50" value={shadow.spread} onChange={(e) => setShadow({ ...shadow, spread: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.shadow_opt_opacity} ({Math.round(shadow.opacity * 100)}%)
                                    </label>
                                    <input type="range" min="0" max="1" step="0.01" value={shadow.opacity} onChange={(e) => setShadow({ ...shadow, opacity: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Color
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={shadow.color} onChange={(e) => setShadow({ ...shadow, color: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                                        <input type="text" value={shadow.color} onChange={(e) => setShadow({ ...shadow, color: e.target.value })} className="flex-1 rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-sm" />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'gradient' && (
                            <>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.gradient_type}
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input type="radio" value="linear" checked={gradient.type === 'linear'} onChange={() => setGradient({ ...gradient, type: 'linear' })} className="text-indigo-600 focus:ring-indigo-500" />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{labels.gradient_linear}</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" value="radial" checked={gradient.type === 'radial'} onChange={() => setGradient({ ...gradient, type: 'radial' })} className="text-indigo-600 focus:ring-indigo-500" />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{labels.gradient_radial}</span>
                                        </label>
                                    </div>
                                </div>
                                {gradient.type === 'linear' && (
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {labels.gradient_angle} ({gradient.angle}°)
                                        </label>
                                        <input type="range" min="0" max="360" value={gradient.angle} onChange={(e) => setGradient({ ...gradient, angle: Number(e.target.value) })} className="w-full" />
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Colors</label>
                                    <div className="flex gap-4">
                                        <input type="color" value={gradient.color1} onChange={(e) => setGradient({ ...gradient, color1: e.target.value })} className="h-10 w-full rounded cursor-pointer border-0" />
                                        <input type="color" value={gradient.color2} onChange={(e) => setGradient({ ...gradient, color2: e.target.value })} className="h-10 w-full rounded cursor-pointer border-0" />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'glass' && (
                            <>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.glass_blur} ({glass.blur}px)
                                    </label>
                                    <input type="range" min="0" max="25" value={glass.blur} onChange={(e) => setGlass({ ...glass, blur: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.glass_transparency} ({Math.round(glass.transparency * 100)}%)
                                    </label>
                                    <input type="range" min="0" max="1" step="0.01" value={glass.transparency} onChange={(e) => setGlass({ ...glass, transparency: Number(e.target.value) })} className="w-full" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {labels.glass_outline} ({Math.round(glass.outline * 100)}%)
                                    </label>
                                    <input type="range" min="0" max="1" step="0.01" value={glass.outline} onChange={(e) => setGlass({ ...glass, outline: Number(e.target.value) })} className="w-full" />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview & Output Section */}
                <div className="w-full lg:w-2/3 space-y-6">
                    <div className={`relative h-96 w-full rounded-2xl flex items-center justify-center p-8 transition-colors ${activeTab === 'glass' ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' : 'bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800'}`}>
                        {/* Preview Box */}
                        <div
                            className="w-64 h-64 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium transition-all duration-200"
                            style={
                                activeTab === 'shadow'
                                    ? { boxShadow: `${shadow.shiftRight}px ${shadow.shiftDown}px ${shadow.blur}px ${shadow.spread}px rgba(${parseInt(shadow.color.slice(1, 3), 16)}, ${parseInt(shadow.color.slice(3, 5), 16)}, ${parseInt(shadow.color.slice(5, 7), 16)}, ${shadow.opacity})` }
                                    : activeTab === 'gradient'
                                        ? { background: gradient.type === 'linear' ? `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})` : `radial-gradient(circle, ${gradient.color1}, ${gradient.color2})` }
                                        : {
                                            background: `rgba(255, 255, 255, ${glass.transparency})`,
                                            backdropFilter: `blur(${glass.blur}px)`,
                                            WebkitBackdropFilter: `blur(${glass.blur}px)`,
                                            border: `1px solid rgba(255, 255, 255, ${glass.outline})`,
                                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                                        }
                            }
                        >
                            <span className={activeTab === 'gradient' ? 'text-white drop-shadow-md' : activeTab === 'glass' ? 'text-gray-800' : ''}>Preview</span>
                        </div>
                    </div>

                    {/* Output Code */}
                    <div className="bg-gray-900 rounded-xl p-6 relative group">
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 mr-1.5 text-green-400" /> : <Copy className="w-4 h-4 mr-1.5" />}
                                {copied ? labels.copied : labels.copy_css}
                            </button>
                        </div>
                        <pre className="font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">
                            {generatedCss}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
