'use client';

import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { Copy, Download, RefreshCw, Trash2, FileJson, FileText, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

type Mode = 'csv_to_json' | 'json_to_csv';

const SAMPLE_JSON = `[
  { "id": 1, "name": "Alice", "role": "Admin" },
  { "id": 2, "name": "Bob", "role": "User" },
  { "id": 3, "name": "Charlie", "role": "Guest" }
]`;

const SAMPLE_CSV = `id,name,role
1,Alice,Admin
2,Bob,User
3,Charlie,Guest`;

interface CsvJsonConverterClientProps {
    labels: {
        title: string;
        description: string;
        mode_csv_to_json: string;
        mode_json_to_csv: string;
        input_csv_placeholder: string;
        input_json_placeholder: string;
        option_header: string;
        option_header_desc: string;
        convert: string;
        copy: string;
        download: string;
        clear: string;
        load_example: string;
        error_invalid_csv: string;
        error_invalid_json: string;
    };
}

export default function CsvJsonConverterClient({ labels }: CsvJsonConverterClientProps) {
    const [mode, setMode] = useState<Mode>('csv_to_json');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [useHeader, setUseHeader] = useState(true);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setInput(text);
                setError(null);
            };
            reader.readAsText(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: mode === 'csv_to_json' ? { 'text/csv': ['.csv'] } : { 'application/json': ['.json'] },
        multiple: false
    });

    const handleLoadExample = () => {
        setInput(mode === 'csv_to_json' ? SAMPLE_CSV : SAMPLE_JSON);
        setError(null);
        setOutput('');
    };

    const handleConvert = () => {
        setError(null);
        setOutput('');

        try {
            if (!input.trim()) return;

            if (mode === 'csv_to_json') {
                Papa.parse(input, {
                    header: useHeader,
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (results.errors.length > 0) {
                            setError(labels.error_invalid_csv);
                            console.error(results.errors);
                        } else {
                            setOutput(JSON.stringify(results.data, null, 2));
                        }
                    },
                    error: (err: any) => {
                        setError(labels.error_invalid_csv);
                    }
                });
            } else {
                // JSON to CSV
                const jsonData = JSON.parse(input);
                const csv = Papa.unparse(jsonData, {
                    header: useHeader,
                });
                setOutput(csv);
            }
        } catch (err) {
            setError(mode === 'csv_to_json' ? labels.error_invalid_csv : labels.error_invalid_json);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = mode === 'csv_to_json' ? 'converted.json' : 'converted.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    {labels.title}
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    {labels.description}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Input Section */}
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${mode === 'csv_to_json' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500'}`}>
                                CSV
                            </span>
                            <button
                                onClick={() => setMode(mode === 'csv_to_json' ? 'json_to_csv' : 'csv_to_json')}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5 text-gray-500" />
                            </button>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${mode === 'json_to_csv' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500'}`}>
                                JSON
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleLoadExample}
                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                            >
                                {labels.load_example}
                            </button>
                            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-2 self-center"></div>
                            <button
                                onClick={() => { setInput(''); setOutput(''); setError(null); }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title={labels.clear}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        {...getRootProps()}
                        className={`relative group border-2 border-dashed rounded-lg p-4 h-[500px] transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <textarea
                            className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            placeholder={mode === 'csv_to_json' ? labels.input_csv_placeholder : labels.input_json_placeholder}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {input === '' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400">
                                <Upload className="w-12 h-12 mb-2 opacity-50" />
                                <p className="text-sm">Drag & drop file here</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="useHeader"
                            checked={useHeader}
                            onChange={(e) => setUseHeader(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="useHeader" className="text-sm text-gray-700 dark:text-gray-300">
                            {labels.option_header} <span className="text-xs text-gray-500">({labels.option_header_desc})</span>
                        </label>
                    </div>

                    <button
                        onClick={handleConvert}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {labels.convert}
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Output Section */}
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[62px]">
                        <span className="font-medium text-gray-700 dark:text-gray-200">Result</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {labels.copy}
                            </button>
                            <button
                                onClick={handleDownload}
                                disabled={!output}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                {labels.download}
                            </button>
                        </div>
                    </div>
                    <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 h-[500px] overflow-auto">
                        <pre className="p-4 text-sm font-mono whitespace-pre-wrap break-all text-gray-800 dark:text-gray-200">
                            {output}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
