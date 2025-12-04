'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Armchair, Settings, X, Save } from 'lucide-react';

interface PomodoroTimerClientProps {
    labels: {
        title: string;
        description: string;
        start: string;
        pause: string;
        reset: string;
        focus_time: string;
        short_break: string;
        long_break: string;
        settings?: string;
        save?: string;
        close?: string;
        minutes?: string;
    };
    lang: string;
}

type TimerMode = 'focus' | 'short' | 'long';

export default function PomodoroTimerClient({ labels }: PomodoroTimerClientProps) {
    const [mode, setMode] = useState<TimerMode>('focus');
    const [customTimes, setCustomTimes] = useState<Record<TimerMode, number>>({
        focus: 25,
        short: 5,
        long: 15,
    });
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [tempTimes, setTempTimes] = useState(customTimes);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const MODES: Record<TimerMode, { label: keyof PomodoroTimerClientProps['labels']; icon: any }> = {
        focus: { label: 'focus_time', icon: Brain },
        short: { label: 'short_break', icon: Coffee },
        long: { label: 'long_break', icon: Armchair },
    };

    useEffect(() => {
        audioRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    }, []);

    const playBeep = () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = 880;
            gain.gain.value = 0.1;

            osc.start();
            setTimeout(() => {
                osc.stop();
                ctx.close();
            }, 200);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            playBeep();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    useEffect(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        document.title = `(${timeString}) ${labels[MODES[mode].label]} - Cheetset`;

        return () => {
            document.title = 'Cheetset';
        };
    }, [timeLeft, mode, labels]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(customTimes[mode] * 60);
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(customTimes[newMode] * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSaveSettings = () => {
        setCustomTimes(tempTimes);
        setIsSettingsOpen(false);
        // If timer is not active, update current time immediately if the current mode was changed
        if (!isActive) {
            setTimeLeft(tempTimes[mode] * 60);
        }
    };

    const progress = ((customTimes[mode] * 60 - timeLeft) / (customTimes[mode] * 60)) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            {/* Settings Button */}
            <div className="absolute top-0 right-0 -mt-12">
                <button
                    onClick={() => {
                        setTempTimes(customTimes);
                        setIsSettingsOpen(true);
                    }}
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    aria-label={labels.settings || "Settings"}
                >
                    <Settings size={24} />
                </button>
            </div>

            {/* Mode Switcher */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 flex mb-8">
                {(Object.keys(MODES) as TimerMode[]).map((m) => {
                    const Icon = MODES[m].icon;
                    return (
                        <button
                            key={m}
                            onClick={() => switchMode(m)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${mode === m
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            <Icon size={18} />
                            <span className="hidden sm:inline">{labels[MODES[m].label]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Timer Display */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
                {/* Progress Bar Background */}
                <div
                    className="absolute bottom-0 left-0 h-2 bg-indigo-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                <div className="text-[8rem] sm:text-[10rem] font-mono font-bold leading-none tracking-tighter text-gray-900 dark:text-white mb-12 tabular-nums">
                    {formatTime(timeLeft)}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={toggleTimer}
                        className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isActive
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 shadow-amber-200/50 dark:shadow-none'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 dark:shadow-indigo-900/30'
                            }`}
                    >
                        {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                        {isActive ? labels.pause : labels.start}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="p-5 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 transition-all hover:rotate-180"
                        aria-label={labels.reset}
                    >
                        <RotateCcw size={28} />
                    </button>
                </div>
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Settings size={20} />
                                {labels.settings || "Settings"}
                            </h3>
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {(Object.keys(MODES) as TimerMode[]).map((m) => (
                                <div key={m} className="flex items-center justify-between">
                                    <label className="text-gray-700 dark:text-gray-300 font-medium">
                                        {labels[MODES[m].label]}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            max="60"
                                            value={tempTimes[m]}
                                            onChange={(e) => setTempTimes({
                                                ...tempTimes,
                                                [m]: Math.max(1, Math.min(60, parseInt(e.target.value) || 1))
                                            })}
                                            className="w-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-center font-mono font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <span className="text-sm text-gray-500">{labels.minutes || "min"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 font-medium transition-colors"
                            >
                                {labels.close || "Close"}
                            </button>
                            <button
                                onClick={handleSaveSettings}
                                className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <Save size={18} />
                                {labels.save || "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
