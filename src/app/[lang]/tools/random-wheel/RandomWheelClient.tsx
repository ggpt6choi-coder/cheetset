'use client';

import { useState, useRef, useEffect } from 'react';
import { Dices, RotateCcw, Trophy } from 'lucide-react';

interface RandomWheelClientProps {
    labels: {
        title: string;
        description: string;
        items_label: string;
        placeholder: string;
        spin: string;
        reset: string;
        winner: string;
    };
}

export default function RandomWheelClient({ labels }: RandomWheelClientProps) {
    const [itemsInput, setItemsInput] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);

    // Colors for wheel segments
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
        '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
    ];

    useEffect(() => {
        const itemList = itemsInput
            .split('\n')
            .map(item => item.trim())
            .filter(item => item.length > 0);
        setItems(itemList);
    }, [itemsInput]);

    useEffect(() => {
        drawWheel();
    }, [items, rotation]);

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas || items.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sliceAngle = (2 * Math.PI) / items.length;

        items.forEach((item, index) => {
            const startAngle = index * sliceAngle + rotation;
            const endAngle = (index + 1) * sliceAngle + rotation;

            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText(item.substring(0, 15) + (item.length > 15 ? '...' : ''), radius - 20, 5);
            ctx.restore();
        });

        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(centerX + radius - 5, centerY); // Tip pointing left (inwards)
        ctx.lineTo(centerX + radius + 15, centerY - 10); // Top right
        ctx.lineTo(centerX + radius + 15, centerY + 10); // Bottom right
        ctx.closePath();
        ctx.fillStyle = '#333';
        ctx.fill();
    };

    const spinWheel = () => {
        if (isSpinning || items.length < 2) return;

        setIsSpinning(true);
        setWinner(null);

        const spinDuration = 3000; // 3 seconds
        const startRotation = rotation;
        const totalRotation = startRotation + (Math.random() * 10 + 10) * Math.PI; // Spin at least 5 times
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            if (elapsed < spinDuration) {
                // Ease out cubic
                const t = elapsed / spinDuration;
                const easeOut = 1 - Math.pow(1 - t, 3);
                const currentRotation = startRotation + (totalRotation - startRotation) * easeOut;
                setRotation(currentRotation);
                requestAnimationFrame(animate);
            } else {
                setRotation(totalRotation);
                setIsSpinning(false);
                determineWinner(totalRotation);
            }
        };

        requestAnimationFrame(animate);
    };

    const determineWinner = (finalRotation: number) => {
        const sliceAngle = (2 * Math.PI) / items.length;
        // Normalize rotation to 0-2PI
        const normalizedRotation = finalRotation % (2 * Math.PI);
        // Calculate which index is at angle 0 (right side, where we usually put pointer, 
        // but wait, my drawing starts at 0 which is 3 o'clock. 
        // Actually, let's simplify. The pointer is at 0 radians (3 o'clock) in my drawing logic?
        // No, typically 0 is 3 o'clock.
        // Let's assume pointer is at 0 (Right).
        // The item at 0 is the one where startAngle <= 0 <= endAngle (modulo 2PI).
        // But since we rotated the whole wheel by `rotation`, the item at 0 is...
        // Let's reverse logic: The angle 0 corresponds to -rotation on the wheel.

        // Let's just use a simpler logic:
        // The pointer is static at 0 (3 o'clock).
        // We need to find which segment covers 0 radians.
        // Segment i spans [i*slice + rot, (i+1)*slice + rot]
        // We want 0 to be in [i*slice + rot, (i+1)*slice + rot] (mod 2PI)
        // => -rot in [i*slice, (i+1)*slice]
        // Let's normalize -rot to [0, 2PI)

        let pointerAngle = 0; // 3 o'clock
        // Adjust if pointer is elsewhere. In my draw code:
        // ctx.moveTo(centerX + radius + 10, centerY); ...
        // This draws pointer at 3 o'clock pointing left. Correct.

        const effectiveAngle = (2 * Math.PI - (finalRotation % (2 * Math.PI))) % (2 * Math.PI);
        const winningIndex = Math.floor(effectiveAngle / sliceAngle);

        setWinner(items[winningIndex]);
    };

    const handleReset = () => {
        setItemsInput('');
        setItems([]);
        setWinner(null);
        setRotation(0);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Dices className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {labels.items_label}
                    </label>
                    <textarea
                        value={itemsInput}
                        onChange={(e) => setItemsInput(e.target.value)}
                        placeholder={labels.placeholder}
                        className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none min-h-[200px]"
                    />
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleReset}
                            className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            {labels.reset}
                        </button>
                    </div>
                </div>

                {/* Wheel Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center">
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            className="max-w-full h-auto"
                        />
                        {/* Center Pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md z-10 border-2 border-gray-200"></div>
                    </div>

                    <button
                        onClick={spinWheel}
                        disabled={isSpinning || items.length < 2}
                        className={`mt-6 w-full px-6 py-4 rounded-xl text-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 ${isSpinning || items.length < 2
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none'
                            }`}
                    >
                        {labels.spin}
                    </button>

                    {winner && (
                        <div className="mt-6 text-center animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                                <Trophy className="w-6 h-6" />
                                <span className="font-bold">{labels.winner}</span>
                            </div>
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                {winner}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
