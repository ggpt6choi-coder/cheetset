'use client';

import { useState, useMemo, useEffect } from 'react';
import { Globe, Search, Trophy, ArrowRight, Flag } from 'lucide-react';
import { countries, Country } from '@/data/countries';

interface FlagQuizClientProps {
    labels: {
        title: string;
        description: string;
        tab_finder: string;
        tab_quiz: string;
        search_placeholder: string;
        region_all: string;
        quiz_question: string;
        quiz_score: string;
        quiz_next: string;
        quiz_correct: string;
        quiz_wrong: string;
    };
    lang: 'en' | 'ko' | 'ja';
}

export default function FlagQuizClient({ labels, lang }: FlagQuizClientProps) {
    const [activeTab, setActiveTab] = useState<'finder' | 'quiz'>('finder');

    // Finder State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');

    // Quiz State
    const [currentQuestion, setCurrentQuestion] = useState<Country | null>(null);
    const [options, setOptions] = useState<Country[]>([]);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [streak, setStreak] = useState(0);

    // Animation States
    const [scoreAnimate, setScoreAnimate] = useState(false);
    const [streakAnimate, setStreakAnimate] = useState(false);

    const regions = useMemo(() => {
        const uniqueRegions = Array.from(new Set(countries.map(c => c.region)));
        return ['All', ...uniqueRegions.sort()];
    }, []);

    const filteredCountries = useMemo(() => {
        return countries.filter(country => {
            const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                country.name[lang].toLowerCase().includes(query) ||
                country.capital[lang].toLowerCase().includes(query); // Allow searching by capital too
            return matchesRegion && matchesSearch;
        });
    }, [searchQuery, selectedRegion, lang]);

    // Quiz Logic
    const generateQuestion = () => {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const wrongOptions = countries
            .filter(c => c.code !== randomCountry.code)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allOptions = [randomCountry, ...wrongOptions].sort(() => 0.5 - Math.random());

        setCurrentQuestion(randomCountry);
        setOptions(allOptions);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    useEffect(() => {
        if (activeTab === 'quiz' && !currentQuestion) {
            generateQuestion();
        }
    }, [activeTab]);

    // Reset animations after they play
    useEffect(() => {
        if (scoreAnimate) {
            const timer = setTimeout(() => setScoreAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [scoreAnimate]);

    useEffect(() => {
        if (streakAnimate) {
            const timer = setTimeout(() => setStreakAnimate(false), 500);
            return () => clearTimeout(timer);
        }
    }, [streakAnimate]);

    const handleAnswer = (countryCode: string) => {
        if (selectedOption || !currentQuestion) return;

        setSelectedOption(countryCode);
        const correct = countryCode === currentQuestion.code;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 10);
            setStreak(prev => prev + 1);
            setScoreAnimate(true);
            setStreakAnimate(true);
        } else {
            setStreak(0);
            setStreakAnimate(true); // Shake/Reset animation
        }
    };

    const getStreakColor = (count: number) => {
        if (count >= 10) return "text-purple-600 dark:text-purple-400 drop-shadow-md"; // Unstoppable
        if (count >= 5) return "text-red-500 dark:text-red-400 drop-shadow-sm"; // Hot
        if (count >= 3) return "text-orange-500 dark:text-orange-400"; // Heating up
        return "text-gray-400 dark:text-gray-500"; // Cold
    };

    const getFlameIcon = (count: number) => {
        // Simple flame for low streak, bigger/more intense for high streak could be done here
        // For now, just scaling via CSS class in render
        return "🔥";
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Flag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setActiveTab('finder')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'finder'
                            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {labels.tab_finder}
                    </button>
                    <button
                        onClick={() => setActiveTab('quiz')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'quiz'
                            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {labels.tab_quiz}
                    </button>
                </div>
            </div>

            {activeTab === 'finder' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Search & Filter */}
                    <div className="space-y-4">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={labels.search_placeholder}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {regions.map(region => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedRegion === region
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {region === 'All' ? labels.region_all : region}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCountries.map(country => (
                            <div key={country.code} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex items-center gap-4">
                                <span className="text-4xl">{country.flag}</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        {country.name[lang]}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        <Globe className="w-3.5 h-3.5" />
                                        {country.region}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {currentQuestion && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Header */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <div className={`flex items-center gap-2 transform transition-all duration-300 ${scoreAnimate ? 'scale-110' : 'scale-100'}`}>
                                    <Trophy className={`w-6 h-6 ${score > 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
                                    <span className={`font-bold text-xl ${score > 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {labels.quiz_score}: {score}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-1.5 font-bold transition-all duration-300 ${streakAnimate ? 'scale-125' : 'scale-100'}`}>
                                    <span className={`text-sm tracking-widest uppercase text-gray-400 dark:text-gray-500`}>Streak</span>
                                    <span className={`text-2xl ${getStreakColor(streak)}`}>
                                        {getFlameIcon(streak)} {streak}
                                    </span>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="p-8 text-center">
                                {/* Flag is the Question */}
                                <div className="text-9xl mb-8 transform hover:scale-110 transition-transform duration-300 filter drop-shadow-md select-none">
                                    {currentQuestion.flag}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                    {labels.quiz_question}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {options.map(option => {
                                        let buttonStyle = "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600";
                                        let animationClass = "";

                                        if (selectedOption) {
                                            if (option.code === currentQuestion.code) {
                                                buttonStyle = "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-300 ring-2 ring-green-500/50";
                                                animationClass = "animate-pulse";
                                            } else if (option.code === selectedOption) {
                                                buttonStyle = "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-300";
                                            } else {
                                                buttonStyle = "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
                                            }
                                        }

                                        return (
                                            <button
                                                key={option.code}
                                                onClick={() => handleAnswer(option.code)}
                                                disabled={!!selectedOption}
                                                className={`p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 ${buttonStyle} ${animationClass} ${!selectedOption && 'hover:scale-[1.02] active:scale-[0.98]'}`}
                                            >
                                                {/* Answer Options are Country Names */}
                                                {option.name[lang]}
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedOption && (
                                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className={`p-4 rounded-xl mb-6 ${isCorrect
                                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                                            }`}>
                                            <p className="font-bold text-lg flex items-center justify-center gap-2">
                                                {isCorrect ? (
                                                    <>
                                                        <span className="text-2xl">🎉</span> {labels.quiz_correct}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-2xl">😢</span> {labels.quiz_wrong.replace('{answer}', currentQuestion.name[lang])}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <button
                                            onClick={generateQuestion}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 mx-auto active:transform active:scale-95"
                                        >
                                            {labels.quiz_next}
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
