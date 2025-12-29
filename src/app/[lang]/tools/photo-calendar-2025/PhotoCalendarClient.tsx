'use client';

import React, { useState, useRef } from 'react';
import { Download, Upload, Trash2, RefreshCw, Smartphone, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

type Props = {
    dict: any; // Dictionary type would be better but using any for flexibility
};

type Theme = 'classic' | 'holiday' | 'film' | 'pastel';

export default function PhotoCalendarClient({ dict }: Props) {
    const t = dict.tools.photo_calendar_2025;
    const [photos, setPhotos] = useState<(string | null)[]>(Array(12).fill(null));
    const [title, setTitle] = useState(t.placeholder_title);
    const [theme, setTheme] = useState<Theme>('classic');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [isExporting, setIsExporting] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(null);

    const handlePhotoClick = (index: number) => {
        setCurrentMonthIndex(index);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && currentMonthIndex !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPhotos = [...photos];
                newPhotos[currentMonthIndex] = reader.result as string;
                setPhotos(newPhotos);
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    const removePhoto = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
    };

    const handleExport = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            // Apply scale for better quality
            const canvas = await html2canvas(canvasRef.current, {
                scale: 3, // Increased scale for better quality with larger images
                useCORS: true, // For cross-origin images if any
                backgroundColor: bgColor,
            });
            const link = document.createElement('a');
            link.download = `my-2025-year-in-photos.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to export image.');
        } finally {
            setIsExporting(false);
        }
    };

    const months = [
        t.month_1, t.month_2, t.month_3, t.month_4,
        t.month_5, t.month_6, t.month_7, t.month_8,
        t.month_9, t.month_10, t.month_11, t.month_12
    ];

    // Theme Styles
    const getThemeStyles = () => {
        switch (theme) {
            case 'holiday':
                return {
                    container: 'p-4 sm:p-6 border-4 border-red-700 bg-[url("/images/noise.png")]',
                    title: 'font-serif text-red-700 font-bold',
                    gridGap: 'gap-2 sm:gap-4',
                    cell: 'rounded-lg border-2 border-gold-500 shadow-md transform rotate-1',
                    monthLabel: 'bg-red-600 text-white font-serif'
                };
            case 'film':
                return {
                    container: 'p-4 sm:p-6 bg-black text-white px-8 sm:px-12',
                    title: 'font-mono text-white tracking-widest uppercase',
                    gridGap: 'gap-y-4 sm:gap-y-8 gap-x-2 sm:gap-x-4',
                    cell: 'aspect-[3/4] border-x-4 sm:border-x-8 border-black shadow-none rounded-none',
                    monthLabel: 'bg-white text-black font-bold font-mono bottom-1 right-1 px-2'
                };
            case 'pastel':
                return {
                    container: 'p-4 sm:p-6 bg-gradient-to-br from-pink-100 to-blue-100',
                    title: 'font-sans text-gray-700 tracking-tight font-light',
                    gridGap: 'gap-3 sm:gap-6',
                    cell: 'rounded-xl sm:rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm',
                    monthLabel: 'bg-white/80 text-gray-600 rounded-full px-3 py-0.5 text-xs top-2 left-2'
                };
            case 'classic':
            default:
                return {
                    container: 'p-4 sm:p-6 pb-12 sm:pb-16 bg-white shadow-xl',
                    title: 'font-sans text-gray-800 font-bold',
                    gridGap: 'gap-2 sm:gap-4',
                    cell: 'bg-gray-100 shadow-inner rounded-sm',
                    monthLabel: 'text-gray-400 font-bold text-xs bottom-2 left-2'
                };
        }
    };

    const s = getThemeStyles();

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Canvas Preview - Reordered to be first */}
            <div className="w-full flex-1 bg-gray-100 dark:bg-gray-900/50 p-2 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-center items-start overflow-hidden lg:sticky lg:top-8">
                <div className="w-full max-w-[600px]"> {/* Increased max width */}
                    <div
                        ref={canvasRef}
                        className={`relative w-full aspect-[3/4] transition-all duration-300 flex flex-col ${s.container}`}
                        style={{ backgroundColor: theme === 'classic' ? bgColor : undefined }}
                    >
                        {/* Theme specific decorations */}
                        {theme === 'film' && (
                            <>
                                <div className="absolute left-1 sm:left-2 top-0 bottom-0 w-4 sm:w-6 flex flex-col justify-between py-4 border-r border-white/20">
                                    {Array(8).fill(0).map((_, i) => <div key={i} className="w-2 sm:w-3 h-3 sm:h-4 bg-white rounded-sm mx-auto" />)}
                                </div>
                                <div className="absolute right-1 sm:right-2 top-0 bottom-0 w-4 sm:w-6 flex flex-col justify-between py-4 border-l border-white/20">
                                    {Array(8).fill(0).map((_, i) => <div key={i} className="w-2 sm:w-3 h-3 sm:h-4 bg-white rounded-sm mx-auto" />)}
                                </div>
                            </>
                        )}

                        <div className="text-center mb-4 sm:mb-8 relative z-10 flex-shrink-0">
                            <h2 className={`text-3xl sm:text-5xl ${s.title}`}>{title}</h2>
                        </div>

                        <div className={`grid grid-cols-3 ${s.gridGap} relative z-10 flex-grow`}>
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePhotoClick(index)}
                                    className={`relative w-full h-full cursor-pointer group overflow-hidden ${s.cell} bg-cover bg-center`}
                                >
                                    {photo ? (
                                        <>
                                            <img src={photo} alt={months[index]} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handlePhotoClick(index); }}
                                                    className="px-2 py-1 bg-white/20 hover:bg-white/40 text-white rounded-full text-[10px] backdrop-blur-md flex items-center gap-1"
                                                >
                                                    <RefreshCw className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={(e) => removePhoto(index, e)}
                                                    className="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-full text-[10px] backdrop-blur-md flex items-center gap-1 border border-red-500/50"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:bg-black/5 hover:text-gray-500 transition-colors">
                                            <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 opacity-50" />
                                            <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider">{t.click_to_add}</span>
                                        </div>
                                    )}

                                    {/* Month Label */}
                                    <div className={`absolute ${s.monthLabel}`}>
                                        {months[index]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer decoration */}
                        <div className="mt-4 sm:mt-8 text-center opacity-60 flex-shrink-0">
                            <p className={`text-[8px] sm:text-[10px] ${theme === 'film' ? 'text-white' : 'text-gray-500'} font-mono uppercase tracking-widest`}>
                                Made with CheetSet
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar / Controls */}
            <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6 border border-gray-100 dark:border-gray-700">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.label_title}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder={t.placeholder_title}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.label_theme}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'classic', label: t.theme_classic, color: 'bg-white border-gray-200' },
                                { id: 'holiday', label: t.theme_holiday, color: 'bg-red-50 border-red-200 text-red-700' },
                                { id: 'film', label: t.theme_film, color: 'bg-gray-900 border-gray-700 text-white' },
                                { id: 'pastel', label: t.theme_pastel, color: 'bg-pink-50 border-pink-200 text-gray-700' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setTheme(item.id as Theme)}
                                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${theme === item.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                                        } ${item.color}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.label_bg_color}
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="h-10 w-20 rounded cursor-pointer"
                            />
                            <button
                                onClick={() => setBgColor('#ffffff')}
                                className="text-xs text-gray-500 underline"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        {isExporting ? <RefreshCw className="animate-spin w-5 h-5" /> : <Download className="w-5 h-5" />}
                        {t.btn_save}
                    </button>

                    <div className="text-xs text-center text-gray-500">
                        * Photos are processed in browser only.
                    </div>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}
