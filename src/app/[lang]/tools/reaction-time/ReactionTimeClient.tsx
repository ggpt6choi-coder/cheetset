'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Zap, RotateCcw, Trophy, Timer } from 'lucide-react';

interface ReactionTimeClientProps {
    labels: {
        title: string;
        description: string;
        wait: string;
        click: string;
        too_soon: string;
        start: string;
        play_again: string;
        average: string;
        best: string;
        tries: string;
        ms: string;
    };
}

type GameState = 'idle' | 'waiting' | 'ready' | 'result' | 'too_soon';

export default function ReactionTimeClient({ labels }: ReactionTimeClientProps) {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [startTime, setStartTime] = useState<number>(0);
    const [reactionTime, setReactionTime] = useState<number>(0);
    const [history, setHistory] = useState<number[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        setGameState('waiting');
        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
        timeoutRef.current = setTimeout(() => {
            setGameState('ready');
            setStartTime(Date.now());
        }, randomDelay);
    };

    const handleClick = () => {
        if (gameState === 'idle') {
            startGame();
        } else if (gameState === 'waiting') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setGameState('too_soon');
        } else if (gameState === 'ready') {
            const endTime = Date.now();
            const time = endTime - startTime;
            setReactionTime(time);
            setHistory(prev => [...prev, time]);
            setGameState('result');
        } else if (gameState === 'result' || gameState === 'too_soon') {
            startGame();
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getAverage = () => {
        if (history.length === 0) return 0;
        return Math.round(history.reduce((a, b) => a + b, 0) / history.length);
    };

    const getBest = () => {
        if (history.length === 0) return 0;
        return Math.min(...history);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Game Area */}
                <div
                    onClick={handleClick}
                    className={`h-96 flex flex-col items-center justify-center cursor-pointer transition-colors select-none ${gameState === 'idle' || gameState === 'result' || gameState === 'too_soon'
                            ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                            : gameState === 'waiting'
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                        }`}
                >
                    {gameState === 'idle' && (
                        <>
                            <Zap className="w-20 h-20 text-indigo-500 mb-6" />
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300">{labels.start}</p>
                        </>
                    )}

                    {gameState === 'waiting' && (
                        <>
                            <div className="text-6xl mb-4">...</div>
                            <h2 className="text-4xl font-bold">{labels.wait}</h2>
                        </>
                    )}

                    {gameState === 'ready' && (
                        <>
                            <div className="text-6xl mb-4">!!!</div>
                            <h2 className="text-4xl font-bold">{labels.click}</h2>
                        </>
                    )}

                    {gameState === 'result' && (
                        <>
                            <Timer className="w-16 h-16 text-indigo-500 mb-4" />
                            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                {reactionTime} {labels.ms}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{labels.play_again}</p>
                        </>
                    )}

                    {gameState === 'too_soon' && (
                        <>
                            <div className="text-6xl mb-4">⚠️</div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{labels.too_soon}</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">{labels.play_again}</p>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-2 text-gray-500 dark:text-gray-400">
                            <Trophy className="w-5 h-5 mr-2" />
                            <span className="font-medium">{labels.best}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {getBest()} <span className="text-sm font-normal text-gray-500">{labels.ms}</span>
                        </p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-2 text-gray-500 dark:text-gray-400">
                            <Timer className="w-5 h-5 mr-2" />
                            <span className="font-medium">{labels.average}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {getAverage()} <span className="text-sm font-normal text-gray-500">{labels.ms}</span>
                        </p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-2 text-gray-500 dark:text-gray-400">
                            <RotateCcw className="w-5 h-5 mr-2" />
                            <span className="font-medium">{labels.tries}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {history.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                <p>{labels.description}</p>
            </div>
        </div>
    );
}
