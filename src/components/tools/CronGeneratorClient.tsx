'use client';

import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue/i18n';
import { Copy, Check, Info } from 'lucide-react';

interface CronGeneratorClientProps {
    labels: {
        title: string;
        description: string;
        output_label: string;
        human_readable: string;
        copy: string;
        copied: string;
        tabs: {
            minutes: string;
            hourly: string;
            daily: string;
            weekly: string;
            monthly: string;
        };
        labels: {
            every_minute: string;
            every_x_minutes: string;
            every_hour: string;
            every_x_hours: string;
            at_time: string;
            on_days: string;
            on_day: string;
        };
    };
    lang: string;
}

type Tab = 'minutes' | 'hourly' | 'daily' | 'weekly' | 'monthly';

export default function CronGeneratorClient({ labels, lang }: CronGeneratorClientProps) {
    const [activeTab, setActiveTab] = useState<Tab>('minutes');
    const [cronExpression, setCronExpression] = useState('* * * * *');
    const [humanReadable, setHumanReadable] = useState('');
    const [copied, setCopied] = useState(false);

    // State for each tab
    const [minutesVal, setMinutesVal] = useState(5);
    const [hourlyVal, setHourlyVal] = useState({ type: 'every', hours: 1, atMinute: 0 });
    const [dailyVal, setDailyVal] = useState({ type: 'every', days: 1, atHour: 0, atMinute: 0 });
    const [weeklyVal, setWeeklyVal] = useState({ days: [] as number[], atHour: 0, atMinute: 0 });
    const [monthlyVal, setMonthlyVal] = useState({ day: 1, atHour: 0, atMinute: 0 });

    // Generate Cron Expression
    useEffect(() => {
        let cron = '* * * * *';

        switch (activeTab) {
            case 'minutes':
                cron = `*/${minutesVal} * * * *`;
                break;
            case 'hourly':
                if (hourlyVal.type === 'every') {
                    cron = `${hourlyVal.atMinute} */${hourlyVal.hours} * * *`;
                } else {
                    cron = `${hourlyVal.atMinute} * * * *`; // Fallback, simpler logic for now
                }
                break;
            case 'daily':
                if (dailyVal.type === 'every') {
                    cron = `${dailyVal.atMinute} ${dailyVal.atHour} */${dailyVal.days} * *`;
                } else {
                    cron = `${dailyVal.atMinute} ${dailyVal.atHour} * * *`;
                }
                break;
            case 'weekly':
                const days = weeklyVal.days.length > 0 ? weeklyVal.days.join(',') : '*';
                cron = `${weeklyVal.atMinute} ${weeklyVal.atHour} * * ${days}`;
                break;
            case 'monthly':
                cron = `${monthlyVal.atMinute} ${monthlyVal.atHour} ${monthlyVal.day} */1 *`;
                break;
        }

        setCronExpression(cron);

        try {
            const desc = cronstrue.toString(cron, { locale: lang === 'ja' ? 'ja' : lang === 'ko' ? 'ko' : 'en' });
            setHumanReadable(desc);
        } catch (e) {
            setHumanReadable('Invalid Cron Expression');
        }
    }, [activeTab, minutesVal, hourlyVal, dailyVal, weeklyVal, monthlyVal, lang]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cronExpression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleWeekDay = (day: number) => {
        setWeeklyVal(prev => {
            const exists = prev.days.includes(day);
            const newDays = exists
                ? prev.days.filter(d => d !== day)
                : [...prev.days, day].sort();
            return { ...prev, days: newDays };
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Output Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                        {labels.output_label}
                    </label>
                    <div className="flex items-center justify-center gap-4">
                        <code className="text-3xl md:text-5xl font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4 rounded-xl">
                            {cronExpression}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
                            title={labels.copy}
                        >
                            {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-lg text-gray-700 dark:text-gray-300">
                    <Info size={20} className="text-blue-500" />
                    <span>{humanReadable}</span>
                </div>
            </div>

            {/* Builder Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
                    {(Object.keys(labels.tabs) as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            {labels.tabs[tab]}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8 min-h-[300px]">
                    {activeTab === 'minutes' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.every_x_minutes.replace('{x}', '')}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="59"
                                    value={minutesVal}
                                    onChange={(e) => setMinutesVal(Number(e.target.value))}
                                    className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {lang === 'en' ? 'minutes' : '분'}
                                </span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hourly' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.every_x_hours.replace('{x}', '')}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="23"
                                    value={hourlyVal.hours}
                                    onChange={(e) => setHourlyVal({ ...hourlyVal, hours: Number(e.target.value) })}
                                    className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {lang === 'en' ? 'hours' : '시간'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.at_time} :
                                </label>
                                <span className="text-gray-500 dark:text-gray-400">XX : </span>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={hourlyVal.atMinute}
                                    onChange={(e) => setHourlyVal({ ...hourlyVal, atMinute: Number(e.target.value) })}
                                    className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center"
                                />
                                <span className="text-gray-500 dark:text-gray-400">
                                    {lang === 'en' ? 'minutes' : '분'}
                                </span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'daily' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.at_time}
                                </label>
                                <input
                                    type="time"
                                    value={`${dailyVal.atHour.toString().padStart(2, '0')}:${dailyVal.atMinute.toString().padStart(2, '0')}`}
                                    onChange={(e) => {
                                        const [h, m] = e.target.value.split(':').map(Number);
                                        setDailyVal({ ...dailyVal, atHour: h, atMinute: m });
                                    }}
                                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'weekly' && (
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                                    <button
                                        key={day}
                                        onClick={() => toggleWeekDay(idx)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${weeklyVal.days.includes(idx)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.at_time}
                                </label>
                                <input
                                    type="time"
                                    value={`${weeklyVal.atHour.toString().padStart(2, '0')}:${weeklyVal.atMinute.toString().padStart(2, '0')}`}
                                    onChange={(e) => {
                                        const [h, m] = e.target.value.split(':').map(Number);
                                        setWeeklyVal({ ...weeklyVal, atHour: h, atMinute: m });
                                    }}
                                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'monthly' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.on_day}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={monthlyVal.day}
                                    onChange={(e) => setMonthlyVal({ ...monthlyVal, day: Number(e.target.value) })}
                                    className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {lang === 'en' ? 'of every month' : '일'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 dark:text-gray-300">
                                    {labels.labels.at_time}
                                </label>
                                <input
                                    type="time"
                                    value={`${monthlyVal.atHour.toString().padStart(2, '0')}:${monthlyVal.atMinute.toString().padStart(2, '0')}`}
                                    onChange={(e) => {
                                        const [h, m] = e.target.value.split(':').map(Number);
                                        setMonthlyVal({ ...monthlyVal, atHour: h, atMinute: m });
                                    }}
                                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
