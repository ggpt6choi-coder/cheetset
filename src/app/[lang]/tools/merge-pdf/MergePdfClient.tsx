'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, RefreshCw, Move } from 'lucide-react';

interface MergePdfClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        merge: string;
        download: string;
        reset: string;
        file_count: string;
        drag_to_reorder: string;
    };
}

interface PdfFile {
    id: string;
    file: File;
    name: string;
    size: number;
}

export default function MergePdfClient({ labels }: MergePdfClientProps) {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                name: file.name,
                size: file.size
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files)
                .filter(file => file.type === 'application/pdf')
                .map(file => ({
                    id: Math.random().toString(36).substr(2, 9),
                    file,
                    name: file.name,
                    size: file.size
                }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id));
        if (mergedPdfUrl) {
            URL.revokeObjectURL(mergedPdfUrl);
            setMergedPdfUrl(null);
        }
    };

    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedItem === null) return;
        if (draggedItem !== index) {
            const newFiles = [...files];
            const draggedFile = newFiles[draggedItem];
            newFiles.splice(draggedItem, 1);
            newFiles.splice(index, 0, draggedFile);
            setFiles(newFiles);
            setDraggedItem(index);
        }
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const mergePdfs = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setMergedPdfUrl(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Failed to merge PDFs. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFiles([]);
        if (mergedPdfUrl) {
            URL.revokeObjectURL(mergedPdfUrl);
            setMergedPdfUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
                </div>

                {/* Upload Area */}
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-900/50"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        multiple
                        className="hidden"
                    />
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {labels.drop_zone}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">PDF only</p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {files.length} {labels.file_count}
                            </h3>
                            <span className="text-sm text-gray-500">{labels.drag_to_reorder}</span>
                        </div>
                        <div className="space-y-3">
                            {files.map((file, index) => (
                                <div
                                    key={file.id}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 ${draggedItem === index ? 'opacity-50' : ''
                                        } cursor-move hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors`}
                                >
                                    <Move className="w-5 h-5 text-gray-400 mr-3 cursor-move" />
                                    <FileText className="w-8 h-8 text-red-500 mr-4" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                {files.length > 0 && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            {labels.reset}
                        </button>

                        {!mergedPdfUrl ? (
                            <button
                                onClick={mergePdfs}
                                disabled={files.length < 2 || isProcessing}
                                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center ${files.length < 2 || isProcessing
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5 mr-2" />
                                        {labels.merge}
                                    </>
                                )}
                            </button>
                        ) : (
                            <a
                                href={mergedPdfUrl}
                                download="merged.pdf"
                                className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                {labels.download}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
