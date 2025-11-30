'use client';

import { useState, useEffect, useRef } from 'react';

interface TicketingClientProps {
    labels: {
        title: string;
        description: string;
        start_game: string;
        score: string;
        time_left: string;
        click_target: string;
        game_over: string;
        final_score: string;
        retry: string;
        share_result: string;
        share_message: string;
        copied: string;
    };
}

export default function TicketingClient({ labels }: TicketingClientProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [targetPosition, setTargetPosition] = useState({ top: '50%', left: '50%' });
    const [gameEnded, setGameEnded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
            setGameEnded(true);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(10);
        setGameEnded(false);
        moveTarget();
    };

    const moveTarget = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const maxX = container.clientWidth - 100; // Button width approx
            const maxY = container.clientHeight - 50; // Button height approx

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            setTargetPosition({
                top: `${randomY}px`,
                left: `${randomX}px`
            });
        }
    };

    const handleClick = () => {
        if (isPlaying) {
            setScore((prev) => prev + 1);
            moveTarget();
        }
    };

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        const text = labels.share_message.replace('{score}', score.toString());

        if (navigator.share) {
            try {
                await navigator.share({
                    title: labels.title,
                    text: text,
                    url: url,
                });
            } catch (err) {
                console.log('Share canceled or failed:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${text} ${url}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{labels.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 text-lg font-semibold">
                    <div className="text-indigo-600 dark:text-indigo-400">
                        {labels.score}: {score}
                    </div>
                    <div className={`text-gray-700 dark:text-gray-300 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`}>
                        {labels.time_left}: {timeLeft}s
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="relative h-[400px] bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden"
                >
                    {!isPlaying && !gameEnded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-lg">
                            <button
                                onClick={startGame}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105"
                            >
                                {labels.start_game}
                            </button>
                        </div>
                    )}

                    {gameEnded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 rounded-lg text-white">
                            <h2 className="text-3xl font-bold mb-4">{labels.game_over}</h2>
                            <p className="text-xl mb-8">{labels.final_score}: {score}</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={startGame}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105"
                                >
                                    {labels.retry}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105"
                                >
                                    {copied ? labels.copied : labels.share_result}
                                </button>
                            </div>
                        </div>
                    )}

                    {isPlaying && (
                        <button
                            onClick={handleClick}
                            style={{ top: targetPosition.top, left: targetPosition.left }}
                            className="absolute bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow-md active:scale-95 transition-transform duration-75"
                        >
                            {labels.click_target}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
