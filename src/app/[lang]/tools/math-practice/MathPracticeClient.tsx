'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Volume2, 
    VolumeX, 
    RotateCcw, 
    Trophy, 
    Flame, 
    Sparkles, 
    CheckCircle2, 
    HelpCircle, 
    ArrowRight, 
    Delete, 
    Keyboard, 
    SlidersHorizontal,
    Star,
    Clock
} from 'lucide-react';

interface MathPracticeClientProps {
    labels: {
        title: string;
        description: string;
        mode_challenge: string;
        mode_infinite: string;
        digits_label: string;
        digits_all: string;
        digits_1: string;
        digits_2: string;
        digits_3: string;
        op_label: string;
        op_all: string;
        op_add: string;
        op_sub: string;
        input_placeholder: string;
        submit_btn: string;
        next_btn: string;
        correct_msg: string;
        wrong_msg: string;
        streak: string;
        best_streak: string;
        score: string;
        accuracy: string;
        sound_on: string;
        sound_off: string;
        keypad_toggle: string;
        challenge_complete: string;
        restart_challenge: string;
        reset: string;
        time_taken: string;
        question_num: string;
        combo_cheer: string;
        clear: string;
        perfect: string;
        good_job: string;
    };
    lang: string;
}

type Mode = 'challenge' | 'infinite';
type DigitRange = 'all' | '1' | '2' | '3';
type Operation = 'mixed' | 'add' | 'sub';

interface Problem {
    num1: number;
    num2: number;
    op: '+' | '-';
    answer: number;
}

// Web Audio API Synthesizer (No external sound files required)
class SoundPlayer {
    private ctx: AudioContext | null = null;

    private getContext(): AudioContext | null {
        if (typeof window === 'undefined') return null;
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    playCorrect() {
        try {
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            
            // 4-note cheerful chime (C5, E5, G5, C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);

                gain.gain.setValueAtTime(0, now + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.4);
            });
        } catch {
            // Audio error ignored
        }
    }

    playWrong() {
        try {
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            
            // Gentle warm boop (not harsh for young kids)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.3);
        } catch {
            // Audio error ignored
        }
    }

    playCelebration() {
        try {
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            
            // Fanfare chords
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);

                gain.gain.setValueAtTime(0, now + idx * 0.12);
                gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.12 + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 0.7);
            });
        } catch {
            // Audio error ignored
        }
    }
}

const INITIAL_PROBLEM: Problem = {
    num1: 8,
    num2: 5,
    op: '+',
    answer: 13,
};

export default function MathPracticeClient({ labels }: MathPracticeClientProps) {
    // Mode & Settings
    const [mode, setMode] = useState<Mode>('challenge'); // 1: challenge, 2: infinite
    const [digitRange, setDigitRange] = useState<DigitRange>('all'); // up to 3 digits
    const [operation, setOperation] = useState<Operation>('mixed'); // +, -, mixed
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
    const [showKeypad, setShowKeypad] = useState<boolean>(true);
    const [showSettings, setShowSettings] = useState<boolean>(false);

    // Current Problem State
    const [currentProblem, setCurrentProblem] = useState<Problem>(INITIAL_PROBLEM);
    const [prevProblem, setPrevProblem] = useState<Problem>(INITIAL_PROBLEM);
    const [userInput, setUserInput] = useState<string>('');
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({
        type: null,
        message: '',
    });
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    // Challenge Mode State (10 questions)
    const [challengeIndex, setChallengeIndex] = useState<number>(1);
    const [challengeScore, setChallengeScore] = useState<number>(0);
    const [challengeAttempts, setChallengeAttempts] = useState<number>(0);
    const [challengeComplete, setChallengeComplete] = useState<boolean>(false);
    const [elapsedTimeStr, setElapsedTimeStr] = useState<string>('');
    const startTimeRef = useRef<number>(0);

    // Infinite Mode State
    const [infiniteTotal, setInfiniteTotal] = useState<number>(0);
    const [infiniteCorrect, setInfiniteCorrect] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [bestStreak, setBestStreak] = useState<number>(0);

    // Sound player & canvas refs
    const soundRef = useRef<SoundPlayer | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        soundRef.current = new SoundPlayer();
    }, []);

    // Helper: Generate Random Number based on selected digit range
    const getRandomNumber = useCallback((range: DigitRange): number => {
        if (range === '1') {
            // 1-digit: 1 ~ 9
            return Math.floor(Math.random() * 9) + 1;
        } else if (range === '2') {
            // 2-digit: 10 ~ 99
            return Math.floor(Math.random() * 90) + 10;
        } else if (range === '3') {
            // 3-digit: 100 ~ 999
            return Math.floor(Math.random() * 900) + 100;
        } else {
            // 'all': Mix of 1 to 3 digits (1 ~ 999)
            // Weighted random so 1, 2, and 3 digits all appear naturally
            const roll = Math.random();
            if (roll < 0.25) {
                // 1-digit (25%)
                return Math.floor(Math.random() * 9) + 1;
            } else if (roll < 0.65) {
                // 2-digit (40%)
                return Math.floor(Math.random() * 90) + 10;
            } else {
                // 3-digit (35%)
                return Math.floor(Math.random() * 900) + 100;
            }
        }
    }, []);

    // Generate Problem logic
    const generateNewProblem = useCallback((): Problem => {
        let n1 = getRandomNumber(digitRange);
        let n2 = getRandomNumber(digitRange);

        // Decide operation
        let op: '+' | '-' = '+';
        if (operation === 'mixed') {
            op = Math.random() < 0.5 ? '+' : '-';
        } else if (operation === 'sub') {
            op = '-';
        } else {
            op = '+';
        }

        // Safe subtraction rule: Ensure n1 >= n2 so result is never negative
        if (op === '-' && n1 < n2) {
            const temp = n1;
            n1 = n2;
            n2 = temp;
        }

        // Avoid exact repeat of previous question
        if (prevProblem && prevProblem.num1 === n1 && prevProblem.num2 === n2 && prevProblem.op === op) {
            n1 += 1;
        }

        const answer = op === '+' ? n1 + n2 : n1 - n2;
        return { num1: n1, num2: n2, op, answer };
    }, [digitRange, operation, getRandomNumber, prevProblem]);

    // Initialize or Reset Game
    const startNewGame = useCallback((
        targetRange: DigitRange = digitRange,
        targetOp: Operation = operation
    ) => {
        setChallengeIndex(1);
        setChallengeScore(0);
        setChallengeAttempts(0);
        setChallengeComplete(false);
        startTimeRef.current = Date.now();
        setElapsedTimeStr('');

        setStreak(0);
        setUserInput('');
        setFeedback({ type: null, message: '' });
        setIsTransitioning(false);

        let n1 = getRandomNumber(targetRange);
        let n2 = getRandomNumber(targetRange);

        let op: '+' | '-' = '+';
        if (targetOp === 'mixed') {
            op = Math.random() < 0.5 ? '+' : '-';
        } else if (targetOp === 'sub') {
            op = '-';
        } else {
            op = '+';
        }

        if (op === '-' && n1 < n2) {
            const temp = n1;
            n1 = n2;
            n2 = temp;
        }

        const newProb = { num1: n1, num2: n2, op, answer: op === '+' ? n1 + n2 : n1 - n2 };
        setCurrentProblem(newProb);
        setPrevProblem(newProb);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    }, [digitRange, operation, getRandomNumber]);

    // Confetti effect on canvas
    const triggerConfetti = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 400;
        canvas.height = canvas.parentElement?.clientHeight || 300;

        const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;
            size: number;
            rotation: number;
            vr: number;
            alpha: number;
        }> = [];

        for (let i = 0; i < 45; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.7) * 14,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                vr: (Math.random() - 0.5) * 10,
                alpha: 1,
            });
        }

        let animationFrameId: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35; // gravity
                p.rotation += p.vr;
                p.alpha -= 0.018;

                if (p.alpha > 0) {
                    active = true;
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                    ctx.restore();
                }
            });

            if (active) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Check Answer
    const handleSubmit = () => {
        if (!currentProblem || isTransitioning) return;
        const trimmed = userInput.trim();
        if (trimmed === '') return;

        const numericAnswer = parseInt(trimmed, 10);
        const isCorrect = numericAnswer === currentProblem.answer;

        if (mode === 'challenge') {
            setChallengeAttempts(prev => prev + 1);
        }

        if (isCorrect) {
            // Correct answer
            if (soundEnabled && soundRef.current) {
                soundRef.current.playCorrect();
            }
            triggerConfetti();

            const cheers = [
                labels.correct_msg,
                '🌟 천재 수학자 등장!',
                '🚀 번개 같은 스피드 정답!',
                '🎯 완벽해요! 최고예요!',
                '👏 척척박사님 대단해요!',
            ];
            const cheerIndex = (challengeScore + streak) % cheers.length;
            const randomCheer = cheers[cheerIndex];

            setFeedback({
                type: 'correct',
                message: randomCheer,
            });

            // Update stats
            if (mode === 'challenge') {
                setChallengeScore(prev => prev + 1);
            } else {
                setInfiniteTotal(prev => prev + 1);
                setInfiniteCorrect(prev => prev + 1);
                const nextStreak = streak + 1;
                setStreak(nextStreak);
                if (nextStreak > bestStreak) {
                    setBestStreak(nextStreak);
                }
            }

            setIsTransitioning(true);

            // Move to next problem smoothly
            setTimeout(() => {
                if (mode === 'challenge' && challengeIndex >= 10) {
                    // Challenge finished
                    const finishTime = Date.now();
                    const totalSec = Math.max(1, Math.floor((finishTime - (startTimeRef.current || finishTime)) / 1000));
                    const mins = Math.floor(totalSec / 60);
                    const secs = totalSec % 60;
                    setElapsedTimeStr(mins > 0 ? `${mins}분 ${secs}초` : `${secs}초`);
                    setChallengeComplete(true);
                    if (soundEnabled && soundRef.current) {
                        soundRef.current.playCelebration();
                    }
                    setIsTransitioning(false);
                } else {
                    if (mode === 'challenge') {
                        setChallengeIndex(prev => prev + 1);
                    }
                    const nextProb = generateNewProblem();
                    setCurrentProblem(nextProb);
                    setPrevProblem(nextProb);
                    setUserInput('');
                    setFeedback({ type: null, message: '' });
                    setIsTransitioning(false);
                    inputRef.current?.focus();
                }
            }, 650);

        } else {
            // Wrong answer
            if (soundEnabled && soundRef.current) {
                soundRef.current.playWrong();
            }

            if (mode === 'infinite') {
                setInfiniteTotal(prev => prev + 1);
                setStreak(0);
            }

            setFeedback({
                type: 'wrong',
                message: labels.wrong_msg,
            });

            // Focus and highlight input to allow re-try
            setTimeout(() => {
                inputRef.current?.select();
            }, 50);
        }
    };

    // Keyboard Handler (Enter to submit)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Virtual Keypad Button Press
    const handleKeypadPress = (val: string) => {
        if (isTransitioning || challengeComplete) return;

        if (val === 'clear') {
            setUserInput('');
        } else if (val === 'backspace') {
            setUserInput(prev => prev.slice(0, -1));
        } else if (val === 'enter') {
            handleSubmit();
        } else {
            if (userInput.length < 6) {
                setUserInput(prev => prev + val);
            }
        }
        inputRef.current?.focus();
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4 select-none">
            {/* Header: Title & Badges */}
            <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>초등 1학년 맞춤형 덧셈·뺄셈</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {labels.title}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            {/* Mode Selector Tabs (1번: 도전 10문제 / 2번: 무한 연습) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setMode('challenge');
                            startNewGame(digitRange, operation);
                        }}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                            mode === 'challenge'
                                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                        }`}
                    >
                        <Trophy className="w-5 h-5 text-amber-300" />
                        <span>{labels.mode_challenge}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setMode('infinite');
                            startNewGame(digitRange, operation);
                        }}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                            mode === 'infinite'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/20 scale-[1.01]'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                        }`}
                    >
                        <Flame className="w-5 h-5 text-orange-300" />
                        <span>{labels.mode_infinite}</span>
                    </button>
                </div>

                {/* Sub Bar: Controls & Quick Stats */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between px-2 text-xs sm:text-sm">
                    {/* Mode Specific Status */}
                    {mode === 'challenge' ? (
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                {labels.question_num.replace('{cur}', challengeIndex.toString()).replace('{total}', '10')}
                            </span>
                            <div className="w-24 sm:w-36 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-indigo-500 transition-all duration-300"
                                    style={{ width: `${(challengeIndex / 10) * 100}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                            <span className="flex items-center gap-1 font-bold text-orange-600 dark:text-orange-400">
                                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                                {streak} {labels.streak}
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {labels.best_streak}: <strong className="text-gray-900 dark:text-gray-100">{bestStreak}</strong>
                            </span>
                            <span className="hidden sm:inline text-gray-400">|</span>
                            <span className="hidden sm:inline text-gray-600 dark:text-gray-400">
                                {labels.score}: <strong className="text-gray-900 dark:text-gray-100">{infiniteCorrect}/{infiniteTotal}</strong>
                            </span>
                        </div>
                    )}

                    {/* Sound, Keypad, Settings buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            title={soundEnabled ? labels.sound_off : labels.sound_on}
                            aria-label={soundEnabled ? labels.sound_off : labels.sound_on}
                        >
                            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowKeypad(!showKeypad)}
                            className={`p-2 rounded-lg transition ${
                                showKeypad ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title={labels.keypad_toggle}
                            aria-label={labels.keypad_toggle}
                        >
                            <Keyboard className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-2 rounded-lg transition ${
                                showSettings ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title="설정"
                            aria-label="설정"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Collapsible Settings Panel: 자릿수 (3자리수까지) & 연산 (+, -) */}
                {showSettings && (
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                        <div>
                            <span className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                                {labels.digits_label} (최대 3자리수)
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                {[
                                    { id: 'all', label: labels.digits_all },
                                    { id: '1', label: labels.digits_1 },
                                    { id: '2', label: labels.digits_2 },
                                    { id: '3', label: labels.digits_3 },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            setDigitRange(item.id as DigitRange);
                                            startNewGame(item.id as DigitRange, operation);
                                        }}
                                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                                            digitRange === item.id
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                                {labels.op_label}
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                                {[
                                    { id: 'mixed', label: labels.op_all },
                                    { id: 'add', label: labels.op_add },
                                    { id: 'sub', label: labels.op_sub },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            setOperation(item.id as Operation);
                                            startNewGame(digitRange, item.id as Operation);
                                        }}
                                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                                            operation === item.id
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Interactive Stage */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-indigo-100 dark:border-gray-700 p-4 sm:p-8 md:p-10 overflow-hidden">
                {/* Canvas for Confetti particle explosion */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none z-20"
                />

                {/* Challenge Finished State Screen */}
                {challengeComplete ? (
                    <div className="text-center py-6 space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-500 shadow-inner">
                            <Trophy className="w-10 h-10 animate-bounce" />
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                                {labels.challenge_complete}
                            </h2>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                                {challengeScore === 10 ? labels.perfect : labels.good_job}
                            </p>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2, 3].map(starNum => {
                                const isEarned = 
                                    (starNum === 1 && challengeScore >= 5) ||
                                    (starNum === 2 && challengeScore >= 8) ||
                                    (starNum === 3 && challengeScore === 10);
                                return (
                                    <Star 
                                        key={starNum}
                                        className={`w-10 h-10 transition-transform ${
                                            isEarned 
                                                ? 'fill-amber-400 text-amber-400 drop-shadow-md scale-110' 
                                                : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        {/* Score Card */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {labels.score}
                                </span>
                                <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                    {challengeScore} / 10
                                </span>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {labels.accuracy}
                                </span>
                                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                    {challengeAttempts > 0 ? Math.round((challengeScore / challengeAttempts) * 100) : 100}%
                                </span>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 col-span-2 sm:col-span-1">
                                <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {labels.time_taken}
                                </span>
                                <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {elapsedTimeStr || '10초'}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => startNewGame()}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-extrabold text-lg shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span>{labels.restart_challenge}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMode('infinite');
                                    startNewGame(digitRange, operation);
                                }}
                                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold transition flex items-center justify-center gap-2"
                            >
                                <Flame className="w-5 h-5 text-orange-500" />
                                <span>{labels.mode_infinite}로 이어하기</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Active Quiz Stage */
                    <div className="space-y-4">
                        {/* 1. Horizontal Equation Card: Problem + Input + Submit Button on ONE row */}
                        <div className="relative py-6 sm:py-10 px-4 sm:px-8 bg-gradient-to-b from-indigo-50/60 to-blue-50/30 dark:from-gray-900/60 dark:to-gray-800/40 rounded-3xl border border-indigo-100/80 dark:border-gray-700/60 flex flex-col items-center justify-center shadow-sm">
                            {/* Streak badge in infinite mode */}
                            {mode === 'infinite' && streak >= 3 && (
                                <div className="absolute top-2.5 right-3 sm:top-3.5 sm:right-4 flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-xs font-black rounded-full shadow-md animate-pulse">
                                    <Flame className="w-3.5 h-3.5 fill-white" />
                                    <span>{streak} COMBO!</span>
                                </div>
                            )}

                            {/* Horizontal Equation: [Num1] [Op] [Num2] [=] [Input] [Confirm Button] */}
                            {currentProblem && (
                                <div className="w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-5 py-2 flex-nowrap overflow-x-auto">
                                    <span className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tabular-nums drop-shadow-sm flex-shrink-0">
                                        {currentProblem.num1}
                                    </span>

                                    <span className={`text-3xl sm:text-5xl md:text-6xl font-black flex-shrink-0 ${
                                        currentProblem.op === '+' ? 'text-blue-500 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400'
                                    }`}>
                                        {currentProblem.op}
                                    </span>

                                    <span className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tabular-nums drop-shadow-sm flex-shrink-0">
                                        {currentProblem.num2}
                                    </span>

                                    <span className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-400 dark:text-gray-500 flex-shrink-0">
                                        =
                                    </span>

                                    {/* Inline Answer Input Box */}
                                    <div className="relative w-24 sm:w-36 md:w-44 flex-shrink-0">
                                        <label htmlFor="math-answer-input" className="sr-only">
                                            {labels.input_placeholder}
                                        </label>
                                        <input
                                            id="math-answer-input"
                                            ref={inputRef}
                                            type="text"
                                            inputMode="none"
                                            pattern="[0-9]*"
                                            autoFocus
                                            disabled={isTransitioning}
                                            value={userInput}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                setUserInput(val);
                                            }}
                                            onKeyDown={handleKeyDown}
                                            placeholder="?"
                                            className="w-full text-center py-2 sm:py-3 px-2 text-2xl sm:text-4xl md:text-5xl font-black rounded-2xl border-3 border-indigo-400 dark:border-indigo-500 bg-white dark:bg-gray-700 text-indigo-950 dark:text-white placeholder-indigo-300 dark:placeholder-gray-500 shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500/25 transition-all"
                                        />
                                        {userInput && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUserInput('');
                                                    inputRef.current?.focus();
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm p-1"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* Inline Submit Button */}
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isTransitioning || userInput.trim() === ''}
                                        className={`py-2 sm:py-3.5 px-3 sm:px-5 rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                                            userInput.trim() !== ''
                                                ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-orange-500/30 hover:brightness-105 cursor-pointer'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                                        }`}
                                    >
                                        <span>{labels.submit_btn}</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                                    </button>
                                </div>
                            )}

                            {/* Feedback Banner */}
                            {feedback.message && (
                                <div 
                                    className={`mt-4 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all transform animate-in fade-in zoom-in-95 ${
                                        feedback.type === 'correct'
                                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                                    }`}
                                >
                                    {feedback.type === 'correct' ? (
                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                        <HelpCircle className="w-4 h-4 flex-shrink-0 text-rose-600 dark:text-rose-400" />
                                    )}
                                    <span>{feedback.message}</span>
                                </div>
                            )}
                        </div>

                        {/* 2. Extra Large Horizontal Keypad: 11 prominent buttons in a sleek horizontal row */}
                        {showKeypad && (
                            <div className="w-full max-w-5xl mx-auto pt-3 sm:pt-5">
                                <div className="flex w-full items-stretch justify-center gap-1.5 sm:gap-2.5 md:gap-3 p-2 sm:p-3 md:p-4 bg-gray-100/95 dark:bg-gray-900/85 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'].map((key) => {
                                        if (key === 'backspace') {
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => handleKeypadPress('backspace')}
                                                    className="flex-1 min-w-0 h-14 sm:h-18 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold border-2 border-b-4 md:border-b-[5px] border-gray-300 dark:border-gray-600 active:border-b-2 active:translate-y-1 transition-all shadow-sm flex items-center justify-center cursor-pointer select-none"
                                                    title={labels.clear}
                                                    aria-label="한 글자 지우기"
                                                >
                                                    <Delete className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                                </button>
                                            );
                                        }
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => handleKeypadPress(key)}
                                                className="flex-1 min-w-0 h-14 sm:h-18 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-black text-xl sm:text-3xl md:text-4xl border-2 border-b-4 md:border-b-[5px] border-gray-300 dark:border-gray-600 active:border-b-2 active:translate-y-1 transition-all shadow-sm flex items-center justify-center cursor-pointer select-none"
                                            >
                                                {key}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Tip for Parents / Elementary 1st Grader */}
            <div className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <p>
                    💡 <strong>Tip</strong>: 키보드의 <strong>Enter(엔터)</strong> 키를 누르면 바로 정답이 확인되고, 다음 문제로 빠르게 넘어갑니다!
                </p>
            </div>
        </div>
    );
}
