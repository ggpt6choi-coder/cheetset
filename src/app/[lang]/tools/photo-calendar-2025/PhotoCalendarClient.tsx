'use client';

import React, { useState, useRef } from 'react';
import { Download, Upload, Trash2, RefreshCw, Smartphone, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

type Props = {
    dict: any;
};

type Theme = 'classic' | 'holiday' | 'film' | 'pastel' | 'vintage' | 'bloom';

export default function PhotoCalendarClient({ dict }: Props) {
    const t = dict.tools.photo_calendar_2025;
    const [photos, setPhotos] = useState<(string | null)[]>(Array(12).fill(null));
    const [title, setTitle] = useState(t.placeholder_title);
    const [theme, setTheme] = useState<Theme>('film');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [aspectRatio, setAspectRatio] = useState('3/4');
    const [isExporting, setIsExporting] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    React.useEffect(() => {
        const savedData = localStorage.getItem('photo_calendar_2025_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.photos) setPhotos(parsed.photos);
                if (parsed.title) setTitle(parsed.title);
                if (parsed.theme) setTheme(parsed.theme);
                if (parsed.bgColor) setBgColor(parsed.bgColor);
                if (parsed.aspectRatio) setAspectRatio(parsed.aspectRatio);
            } catch (e) {
                console.error('Failed to load saved data', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    React.useEffect(() => {
        if (!isLoaded) return; // Don't save initial default values
        const data = { photos, title, theme, bgColor, aspectRatio };
        localStorage.setItem('photo_calendar_2025_data', JSON.stringify(data));
    }, [photos, title, theme, bgColor, aspectRatio, isLoaded]);

    // Prevent accidental refresh (beforeunload)
    React.useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Check if there is any unsaved data worth warning about (e.g. at least one photo)
            const hasData = photos.some(p => p !== null) || title !== t.placeholder_title;
            if (hasData) {
                e.preventDefault();
                e.returnValue = ''; // Standard for Chrome
                return ''; // Standard for Legacy
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [photos, title, t.placeholder_title]);

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
            const isMobile = window.innerWidth < 768;

            const canvas = await html2canvas(canvasRef.current, {
                scale: isMobile ? 2 : 3,
                useCORS: true,
                backgroundColor: bgColor,
                logging: false,
                onclone: (clonedDoc) => {
                    const clonedCanvas = clonedDoc.querySelector('[data-html2canvas-ignore="true"]');
                    if (clonedCanvas) {
                        clonedCanvas.remove();
                    }
                }
            });

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    alert('Failed to generate image');
                    return;
                }

                const timestamp = new Date().toISOString().slice(0, 10);
                const fileName = `my-2025-photos-${timestamp}.png`;
                const file = new File([blob], fileName, { type: 'image/png' });

                // Try Web Share API (Mobile: "Save Image" option in share sheet)
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'My 2025 Photo Calendar',
                        });
                        return;
                    } catch (error: any) {
                        // Ignore AbortError (user cancelled)
                        if (error.name !== 'AbortError') {
                            console.warn('Share failed, falling back to download', error);
                        } else {
                            return;
                        }
                    }
                }

                // Fallback: Standard Download Link (Desktop)
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = fileName;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            }, 'image/png');
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

    // Theme Styles - Refactored to use explicit inline styles for ALL colors/borders/shadows
    const getThemeStyles = () => {
        const commonCell = 'relative w-full h-full cursor-pointer group overflow-hidden bg-cover bg-center bg-no-repeat';

        // Aspect Ratio Logic: Apply to cellStyle based on user selection
        const ratioStyle = aspectRatio === 'auto' ? {} : { aspectRatio: aspectRatio };

        switch (theme) {
            case 'holiday':
                return {
                    containerClass: 'p-4 sm:p-6 flex flex-col',
                    containerStyle: {
                        border: '8px double #d97706',
                        backgroundColor: '#1a120b'
                    },
                    titleClass: 'text-4xl sm:text-5xl whitespace-pre-line leading-tight font-bold',
                    titleStyle: {
                        color: '#f59e0b',
                        fontFamily: 'var(--font-playfair)'
                    },
                    gridGap: 'gap-2 sm:gap-4',
                    cellClass: `${commonCell} rounded-md`,
                    cellStyle: {
                        border: '1px solid #f59e0b',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
                        ...ratioStyle
                    },
                    monthLabelClass: 'font-serif text-sm font-bold text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#f59e0b',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                    },
                    footerColor: 'rgba(245, 158, 11, 0.5)'
                };
            case 'film': // Blue Sky
                return {
                    containerClass: 'p-4 sm:p-6 relative flex flex-col',
                    containerStyle: {
                        background: 'linear-gradient(to bottom, #bae6fd, #eff6ff)'
                    },
                    titleClass: 'text-4xl sm:text-5xl whitespace-pre-line leading-tight font-bold tracking-wide',
                    titleStyle: {
                        color: '#2563eb',
                        fontFamily: 'var(--font-dancing)'
                    },
                    gridGap: 'gap-y-4 sm:gap-y-8 gap-x-2 sm:gap-x-4',
                    cellClass: `${commonCell} rounded-xl`, // Removed aspect-[3/4]
                    cellStyle: {
                        border: '4px solid #ffffff',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        ...ratioStyle
                    },
                    monthLabelClass: 'font-bold text-sm text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#1e40af',
                        fontFamily: 'var(--font-dancing)'
                    },
                    footerColor: 'rgba(30, 58, 138, 0.4)'
                };
            case 'vintage':
                return {
                    containerClass: 'p-4 sm:p-6 relative flex flex-col',
                    containerStyle: {
                        backgroundColor: '#d4c5b0',
                        border: '4px dashed #8c7b65'
                    },
                    titleClass: 'text-4xl sm:text-5xl whitespace-pre-line leading-tight font-bold tracking-widest uppercase',
                    titleStyle: {
                        color: '#5d4037',
                        fontFamily: 'monospace'
                    },
                    gridGap: 'gap-3 sm:gap-6',
                    cellClass: `${commonCell} rounded-sm sepia-[.3] contrast-125`,
                    cellStyle: {
                        border: '2px solid #8c7b65',
                        ...ratioStyle
                    },
                    monthLabelClass: 'font-mono text-xs font-bold text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#5d4037'
                    },
                    footerColor: 'rgba(93, 64, 55, 0.6)'
                };
            case 'bloom':
                return {
                    containerClass: 'p-4 sm:p-6 flex flex-col',
                    containerStyle: {
                        backgroundColor: '#fff0f5',
                        border: '12px solid #ffb7b2'
                    },
                    titleClass: 'text-4xl sm:text-5xl whitespace-pre-line leading-tight font-bold italic',
                    titleStyle: {
                        color: '#ff6f61',
                        fontFamily: 'var(--font-playfair)'
                    },
                    gridGap: 'gap-3 sm:gap-6',
                    cellClass: `${commonCell} rounded-[30px]`,
                    cellStyle: {
                        border: '4px solid #ffdac1',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                        ...ratioStyle
                    },
                    monthLabelClass: 'font-serif text-sm font-bold text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#ef4444'
                    },
                    footerColor: '#ff6f61'
                };
            case 'pastel':
                return {
                    containerClass: 'p-4 sm:p-6 relative flex flex-col',
                    containerStyle: {
                        background: 'linear-gradient(to bottom right, #FFDEE9, #B5FFFC)'
                    },
                    titleClass: 'text-5xl sm:text-7xl whitespace-pre-line leading-tight font-bold',
                    titleStyle: {
                        color: '#374151',
                        fontFamily: 'var(--font-dancing)'
                    },
                    gridGap: 'gap-3 sm:gap-6',
                    cellClass: `${commonCell} rounded-2xl`,
                    cellStyle: {
                        border: '4px solid rgba(255,255,255,0.8)',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        ...ratioStyle
                    },
                    monthLabelClass: 'text-sm font-bold text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#4b5563',
                        fontFamily: 'var(--font-dancing)'
                    },
                    footerColor: '#6b7280'
                };
            case 'classic':
            default:
                return {
                    containerClass: 'p-4 sm:p-8 pb-16 sm:pb-24 flex flex-col',
                    containerStyle: {
                        backgroundColor: '#ffffff',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                    },
                    titleClass: 'text-4xl sm:text-5xl whitespace-pre-line leading-tight font-black tracking-tight',
                    titleStyle: {
                        color: '#111827',
                        fontFamily: 'var(--font-playfair)'
                    },
                    gridGap: 'gap-2 sm:gap-4',
                    cellClass: `${commonCell} rounded-sm`,
                    cellStyle: {
                        backgroundColor: '#f9fafb',
                        boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
                        ...ratioStyle
                    },
                    monthLabelClass: 'font-serif uppercase tracking-widest text-xs font-bold text-center w-full mt-1',
                    monthLabelStyle: {
                        color: '#9ca3af'
                    },
                    footerColor: '#6b7280'
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
                        className={`relative w-full aspect-[3/4] transition-all duration-300 ${s.containerClass}`}
                        style={{
                            ...s.containerStyle,
                            backgroundColor: theme === 'classic' ? bgColor : s.containerStyle.backgroundColor
                        }}
                    >
                        {/* Decorations */}
                        {theme === 'film' && ( // Sky Theme decorations
                            <>
                                <div className="absolute top-10 left-10 w-20 h-8 blur-xl rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
                                <div className="absolute top-20 right-20 w-32 h-12 blur-xl rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                                <div className="absolute bottom-20 left-1/2 w-40 h-16 blur-2xl rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                            </>
                        )}
                        {theme === 'vintage' && ( // Vintage decorations
                            <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#8c7b65 1px, rgba(0,0,0,0) 1px)', backgroundSize: '16px 16px' }} />
                        )}

                        <div className="text-center mb-6 sm:mb-10 relative z-10 flex-shrink-0 pt-2">
                            {/* Decorative icon */}
                            {theme === 'holiday' && <div className="text-2xl mb-2">🥂</div>}
                            {theme === 'film' && <div className="text-2xl mb-2">☁️</div>}
                            {theme === 'bloom' && <div className="text-2xl mb-2">🌸</div>}
                            {theme === 'vintage' && <div className="text-2xl mb-2 opacity-50">📜</div>}
                            <h2
                                className={s.titleClass}
                                style={s.titleStyle}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => setTitle(e.currentTarget.textContent || title)}
                            >
                                {title}
                            </h2>
                        </div>

                        <div className={`grid grid-cols-3 ${s.gridGap} relative z-10 flex-grow`}>
                            {photos.map((photo, index) => (
                                <div key={index} className="flex flex-col gap-1.5 group relative">
                                    <div
                                        onClick={() => handlePhotoClick(index)}
                                        className={s.cellClass}
                                        style={s.cellStyle}
                                    >
                                        {photo ? (
                                            <>
                                                <img src={photo} alt={months[index]} className="w-full h-full object-cover" />
                                                {/* Buttons - Hidden in export via onclone or css */}
                                                <div
                                                    data-html2canvas-ignore="true"
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20"
                                                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                                                >
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handlePhotoClick(index); }}
                                                        className="px-2 py-1 rounded-full text-[10px] flex items-center gap-1"
                                                        style={{
                                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                                            color: '#ffffff',
                                                            backdropFilter: 'blur(4px)'
                                                        }}
                                                    >
                                                        <RefreshCw className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => removePhoto(index, e)}
                                                        className="px-2 py-1 rounded-full text-[10px] flex items-center gap-1"
                                                        style={{
                                                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                                            color: '#fee2e2',
                                                            border: '1px solid rgba(239, 68, 68, 0.5)',
                                                            backdropFilter: 'blur(4px)'
                                                        }}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className="w-full h-full flex flex-col items-center justify-center transition-colors"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#9ca3af' }}
                                            >
                                                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 opacity-30" />
                                                <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider opacity-50">{t.click_to_add}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Month Label */}
                                    <div
                                        className={s.monthLabelClass}
                                        style={s.monthLabelStyle}
                                    >
                                        {months[index]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer decoration */}
                        <div className="mt-4 sm:mt-8 text-center opacity-40 flex-shrink-0 pb-2">
                            <p
                                className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em]"
                                style={{ color: s.footerColor }}
                            >
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
                                { id: 'film', label: t.theme_film, color: 'bg-[#e0f2fe] border-[#7dd3fc] text-[#0369a1]' },
                                { id: 'vintage', label: t.theme_vintage, color: 'bg-[#d6cbb6] border-[#a18e76] text-[#5d4037]' },
                                { id: 'bloom', label: t.theme_bloom, color: 'bg-[#fff0f5] border-[#ffb7b2] text-[#ff6f61]' },
                                { id: 'holiday', label: t.theme_holiday, color: 'bg-[#2a1b12] border-[#d97706] text-[#f59e0b]' },
                                { id: 'pastel', label: t.theme_pastel, color: 'bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200 text-gray-700' },
                                { id: 'classic', label: t.theme_classic, color: 'bg-white border-gray-200' },
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
                            Photo Size
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: '3/4', ratio: '3:4', desc: 'Portrait' },
                                { id: '1/1', ratio: '1:1', desc: 'Square' },
                                { id: '4/3', ratio: '4:3', desc: 'Landscape' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setAspectRatio(item.id)}
                                    className={`p-2 rounded-lg border transition-all flex flex-col items-center justify-center gap-0.5 ${aspectRatio === item.id
                                        ? 'bg-blue-50 border-blue-500 text-blue-600 ring-1 ring-blue-500'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-sm font-bold">{item.ratio}</span>
                                    <span className="text-[10px] opacity-80">{item.desc}</span>
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
