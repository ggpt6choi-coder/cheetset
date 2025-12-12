'use client';

import { useState, useRef } from 'react';
import exifr from 'exifr';
import { Upload, Image as ImageIcon, MapPin, Info, Camera, Calendar, FileText, X, AlertTriangle } from 'lucide-react';

interface ExifViewerClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        drop_zone_sub: string;
        no_data: string;
        processing: string;
        basic_info: string;
        camera_info: string;
        settings_info: string;
        gps_info: string;
        file_name: string;
        file_size: string;
        dimensions: string;
        mime_type: string;
        make: string;
        model: string;
        lens: string;
        date_taken: string;
        exposure: string;
        aperture: string;
        iso: string;
        focal_length: string;
        flash: string;
        latitude: string;
        longitude: string;
        view_on_map: string;
        reset: string;
        remove_exif: string; // Placeholder for future feature or just advice
        privacy_note: string;
    };
}

interface ExifData {
    [key: string]: any;
}

export default function ExifViewerClient({ labels }: ExifViewerClientProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [exifData, setExifData] = useState<ExifData | null>(null);
    const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const processFile = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        setExifData(null);

        try {
            // Set file info
            setFileInfo({
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type
            });

            // Read image for preview
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target?.result as string);
            reader.readAsDataURL(file);

            // Parse EXIF
            const data = await exifr.parse(file, {
                tiff: true,
                exif: true,
                gps: true,
                ifd0: true,
                ifd1: true
            } as any);

            if (data && Object.keys(data).length > 0) {
                setExifData(data);
            } else {
                setError(labels.no_data);
            }
        } catch (err) {
            console.error(err);
            setError(labels.no_data);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                processFile(file);
            }
        }
    };

    const handleReset = () => {
        setImageSrc(null);
        setExifData(null);
        setFileInfo(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const renderValue = (value: any) => {
        if (value instanceof Date) return value.toLocaleString();
        if (typeof value === 'number') return Number.isInteger(value) ? value : value.toFixed(2);
        if (Array.isArray(value)) return value.join(', ');
        return String(value);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Camera className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            {!imageSrc ? (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="max-w-2xl mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-white dark:bg-gray-800"
                >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {labels.drop_zone}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {labels.drop_zone_sub}
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic,image/tiff"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image & Basic Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="relative aspect-auto min-h-[200px] bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
                                <img
                                    src={imageSrc}
                                    alt="Preview"
                                    className="max-w-full max-h-[400px] object-contain rounded-lg"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-500" />
                                    {labels.basic_info}
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">{labels.file_name}</span>
                                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{fileInfo?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">{labels.file_size}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{fileInfo?.size}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">{labels.mime_type}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{fileInfo?.type}</span>
                                    </div>
                                    {exifData?.ExifImageWidth && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">{labels.dimensions}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {exifData.ExifImageWidth} x {exifData.ExifImageHeight}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                {labels.privacy_note}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: EXIF Data */}
                    <div className="lg:col-span-2 space-y-6">
                        {error ? (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-2xl text-center">
                                <Info className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                                    {labels.no_data}
                                </h3>
                                <p className="text-yellow-700 dark:text-yellow-300">
                                    This image doesn't seem to have any EXIF metadata. This is common for images downloaded from social media or processed by some tools.
                                </p>
                            </div>
                        ) : exifData ? (
                            <>
                                {/* Camera Info */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-indigo-500" />
                                        {labels.camera_info}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.make}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.Make || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.model}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.Model || '-'}</p>
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.lens}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.LensModel || '-'}</p>
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.date_taken}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {renderValue(exifData.DateTimeOriginal || exifData.CreateDate || '-')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Info */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-indigo-500" />
                                        {labels.settings_info}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.aperture}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                {exifData.FNumber ? `f/${exifData.FNumber}` : '-'}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.exposure}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                {exifData.ExposureTime ? (exifData.ExposureTime < 1 ? `1/${Math.round(1 / exifData.ExposureTime)}` : exifData.ExposureTime) : '-'}s
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.iso}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.ISO || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.focal_length}</span>
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                {exifData.FocalLength ? `${exifData.FocalLength}mm` : '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* GPS Info */}
                                {(exifData.latitude || exifData.GPSLatitude) && (
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-indigo-500" />
                                            {labels.gps_info}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="space-y-1">
                                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.latitude}</span>
                                                <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.latitude || exifData.GPSLatitude}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.longitude}</span>
                                                <p className="text-lg font-medium text-gray-900 dark:text-white">{exifData.longitude || exifData.GPSLongitude}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${exifData.latitude || exifData.GPSLatitude},${exifData.longitude || exifData.GPSLongitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                                        >
                                            <MapPin className="w-4 h-4" />
                                            {labels.view_on_map}
                                        </a>
                                    </div>
                                )}

                                {/* Raw Data (Collapsible or just list) */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                        Raw Data
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                                                <tr>
                                                    <th className="px-4 py-3 rounded-l-lg">Tag</th>
                                                    <th className="px-4 py-3 rounded-r-lg">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {Object.entries(exifData).map(([key, value]) => (
                                                    <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{key}</td>
                                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate" title={String(value)}>
                                                            {renderValue(value)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400">
                                    {isProcessing ? labels.processing : 'Upload an image to view EXIF data'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
