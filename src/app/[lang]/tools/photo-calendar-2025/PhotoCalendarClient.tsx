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
            // Detect mobile
            const isMobile = window.innerWidth < 768;

            const canvas = await html2canvas(canvasRef.current, {
                scale: isMobile ? 2 : 3, // Reduce scale on mobile to prevent crashes
                useCORS: true,
                backgroundColor: bgColor,
                logging: false,
                onclone: (clonedDoc) => {
                    // Find the canvas element in the cloned document
                    const clonedCanvas = clonedDoc.querySelector('[data-html2canvas-ignore="true"]');
                    if (clonedCanvas) {
                        clonedCanvas.remove();
                    }
                }
            });

            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `my-2025-photos-${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to export image. Please try again with fewer photos or on a desktop.');
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
            case 'holiday': // Year-End (Midnight Gold)
                return {
                    container: 'p-4 sm:p-6 border-8 border-double border-[#d97706] bg-[#1a120b]',
                    title: 'font-[family-name:var(--font-playfair)] text-[#f59e0b] font-bold',
                    gridGap: 'gap-2 sm:gap-4',
                    cell: 'rounded-md border border-[#f59e0b]/30 shadow-sm',
                    monthLabel: 'bg-[#d97706] text-[#1a120b] font-serif px-2 py-0.5 rounded-br-lg top-0 left-0 font-bold'
                };
            case 'film': // Blue Sky (Clouds)
                return {
                    container: 'p-4 sm:p-6 bg-gradient-to-b from-[#bae6fd] to-[#eff6ff] relative',
                    title: 'font-[family-name:var(--font-dancing)] text-[#2563eb] font-bold tracking-wide',
                    gridGap: 'gap-y-4 sm:gap-y-8 gap-x-2 sm:gap-x-4',
                    cell: 'aspect-[3/4] border-4 border-[#ffffff] shadow-lg rounded-xl',
                    monthLabel: 'bg-[#ffffff]/80 text-[#3b82f6] font-bold rounded-full px-2 py-0.5 bottom-2 right-2 text-[10px]'
                };
            case 'pastel':
                return {
                    container: 'p-4 sm:p-6 bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]',
                    title: 'font-[family-name:var(--font-dancing)] text-[#374151] text-5xl sm:text-7xl font-bold',
                    gridGap: 'gap-3 sm:gap-6',
                    cell: 'rounded-2xl shadow-lg border-4 border-[#ffffff]/80',
                    monthLabel: 'bg-[#ffffff]/90 text-[#6b7280] rounded-full px-3 py-1 text-xs bottom-2 left-1/2 -translate-x-1/2'
                };
            case 'classic':
            default:
                return {
                    container: 'p-4 sm:p-8 pb-16 sm:pb-24 bg-[#ffffff] shadow-xl',
                    title: 'font-[family-name:var(--font-playfair)] text-[#111827] font-black tracking-tight',
                    gridGap: 'gap-2 sm:gap-4',
                    cell: 'bg-[#f9fafb] shadow-inner rounded-sm',
                    monthLabel: 'text-[#9ca3af] font-serif uppercase tracking-widest text-xs bottom-2 left-1/2 -translate-x-1/2 w-full text-center bg-white/80 py-0.5 backdrop-blur-sm'
                };
        }
    };

    const s = getThemeStyles();

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Canvas Preview */}
            <div className="w-full flex-1 bg-gray-100 dark:bg-gray-900/50 p-2 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-center items-start overflow-hidden lg:sticky lg:top-8">
                <div className="w-full max-w-[600px]">
                    <div
                        ref={canvasRef}
                        className={`relative w-full aspect-[3/4] transition-all duration-300 flex flex-col ${s.container}`}
                        style={{ backgroundColor: theme === 'classic' ? bgColor : undefined }}
                    >
                        {/* Decorations */}
                        {theme === 'film' && ( // Sky Theme decorations
                            <>
                                <div className="absolute top-10 left-10 w-20 h-8 bg-[#ffffff]/40 blur-xl rounded-full" />
                                <div className="absolute top-20 right-20 w-32 h-12 bg-[#ffffff]/30 blur-xl rounded-full" />
                                <div className="absolute bottom-20 left-1/2 w-40 h-16 bg-[#ffffff]/20 blur-2xl rounded-full" />
                            </>
                        )}

                        <div className="text-center mb-6 sm:mb-10 relative z-10 flex-shrink-0 pt-2">
                            {/* Decorative icon */}
                            {theme === 'holiday' && <div className="text-2xl mb-2">🥂</div>}
                            {theme === 'film' && <div className="text-2xl mb-2">☁️</div>}
                            <h2 className={`text-4xl sm:text-5xl whitespace-pre-line leading-tight ${s.title}`}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => setTitle(e.currentTarget.textContent || title)}
                            >
                                {title}
                            </h2>
                        </div>

                        <div className={`grid grid-cols-3 ${s.gridGap} relative z-10 flex-grow`}>
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePhotoClick(index)}
                                    className={`relative w-full h-full cursor-pointer group overflow-hidden ${s.cell} bg-cover bg-center bg-no-repeat`}
                                >
                                    {photo ? (
                                        <>
                                            <img src={photo} alt={months[index]} className="w-full h-full object-cover" />
                                            {/* Buttons - Hidden in export via onclone or css */}
                                            <div
                                                data-html2canvas-ignore="true"
                                                className="absolute inset-0 bg-[#000000]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20"
                                            >
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handlePhotoClick(index); }}
                                                    className="px-2 py-1 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 text-[#ffffff] rounded-full text-[10px] backdrop-blur-md flex items-center gap-1"
                                                >
                                                    <RefreshCw className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={(e) => removePhoto(index, e)}
                                                    className="px-2 py-1 bg-[#ef4444]/20 hover:bg-[#ef4444]/40 text-[#fecaca] rounded-full text-[10px] backdrop-blur-md flex items-center gap-1 border border-[#ef4444]/50"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[#9ca3af] hover:bg-[#000000]/5 hover:text-[#6b7280] transition-colors bg-[#000000]/5">
                                            <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 opacity-30" />
                                            <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider opacity-50">{t.click_to_add}</span>
                                        </div>
                                    )}

                                    {/* Month Label */}
                                    <div className={`absolute ${s.monthLabel} pointer-events-none`}>
                                        {months[index]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer decoration */}
                        <div className="mt-4 sm:mt-8 text-center opacity-40 flex-shrink-0 pb-2">
                            <p className={`text-[8px] sm:text-[10px] ${theme === 'holiday' ? 'text-[#f59e0b]/50' : (theme === 'film' ? 'text-[#1e3a8a]/40' : 'text-[#6b7280]')} font-mono uppercase tracking-[0.2em]`}>
                                GOOD BYE · 2025
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
                                { id: 'holiday', label: t.theme_holiday, color: 'bg-[#1a120b] border-amber-600/50 text-amber-500' },
                                { id: 'film', label: t.theme_film, color: 'bg-image-[linear-gradient(to_bottom,#bae6fd,#eff6ff)] border-sky-300 text-sky-700' },
                                { id: 'pastel', label: t.theme_pastel, color: 'bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200 text-gray-700' },
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
