'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, RefreshCw, Scissors } from 'lucide-react';

interface SplitPdfClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        split: string;
        download: string;
        reset: string;
        page_range: string;
        extract_all: string;
        extract_custom: string;
        total_pages: string;
    };
}

export default function SplitPdfClient({ labels }: SplitPdfClientProps) {
    const [file, setFile] = useState<File | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [splitMode, setSplitMode] = useState<'all' | 'custom'>('custom');
    const [pageRange, setPageRange] = useState<string>('');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            await loadPdfInfo(selectedFile);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                await loadPdfInfo(selectedFile);
            }
        }
    };

    const loadPdfInfo = async (file: File) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            setTotalPages(pdf.getPageCount());
            setDownloadUrl(null);
            setPageRange('');
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Failed to load PDF. Please try again.');
        }
    };

    const parsePageRange = (range: string, max: number): number[] => {
        const pages = new Set<number>();
        const parts = range.split(',').map(p => p.trim());

        for (const part of parts) {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                    for (let i = start; i <= end; i++) {
                        if (i >= 1 && i <= max) pages.add(i - 1);
                    }
                }
            } else {
                const page = Number(part);
                if (!isNaN(page) && page >= 1 && page <= max) {
                    pages.add(page - 1);
                }
            }
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    const splitPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const srcPdf = await PDFDocument.load(arrayBuffer);
            const newPdf = await PDFDocument.create();

            let pagesToExtract: number[] = [];

            if (splitMode === 'all') {
                pagesToExtract = Array.from({ length: srcPdf.getPageCount() }, (_, i) => i);
            } else {
                pagesToExtract = parsePageRange(pageRange, srcPdf.getPageCount());
            }

            if (pagesToExtract.length === 0) {
                alert('Please select valid pages.');
                setIsProcessing(false);
                return;
            }

            const copiedPages = await newPdf.copyPages(srcPdf, pagesToExtract);
            copiedPages.forEach(page => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
        } catch (error) {
            console.error('Error splitting PDF:', error);
            alert('Failed to split PDF. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFile(null);
        setTotalPages(0);
        setPageRange('');
        setDownloadUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
                </div>

                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-900/50"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="hidden"
                        />
                        <Upload className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                            {labels.drop_zone}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">PDF only</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <FileText className="w-8 h-8 text-red-500 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                                    <p className="text-sm text-gray-500">{labels.total_pages} {totalPages}</p>
                                </div>
                            </div>
                            <button
                                onClick={reset}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                onClick={() => setSplitMode('custom')}
                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${splitMode === 'custom'
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                                    }`}
                            >
                                <h3 className="font-semibold text-lg mb-2">{labels.extract_custom}</h3>
                                <input
                                    type="text"
                                    value={pageRange}
                                    onChange={(e) => setPageRange(e.target.value)}
                                    placeholder={labels.page_range}
                                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            <div
                                onClick={() => setSplitMode('all')}
                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${splitMode === 'all'
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                                    }`}
                            >
                                <h3 className="font-semibold text-lg mb-2">{labels.extract_all}</h3>
                                <p className="text-sm text-gray-500">Extract every page into separate files (Coming soon - currently extracts all pages into one file)</p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            {!downloadUrl ? (
                                <button
                                    onClick={splitPdf}
                                    disabled={isProcessing || (splitMode === 'custom' && !pageRange)}
                                    className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center ${isProcessing || (splitMode === 'custom' && !pageRange)
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
                                            <Scissors className="w-5 h-5 mr-2" />
                                            {labels.split}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <a
                                    href={downloadUrl}
                                    download={`split-${file.name}`}
                                    className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    {labels.download}
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
