'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, AlertCircle } from 'lucide-react';
import parseCurl from 'parse-curl';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CurlConverterClientProps {
    labels: {
        title: string;
        description: string;
        input_label: string;
        input_placeholder: string;
        output_label: string;
        copy_button: string;
        copied: string;
        error_invalid_curl: string;
        lang_python: string;
        lang_javascript: string;
        lang_node: string;
        lang_go: string;
        lang_php: string;
        examples_label: string;
        example_get: string;
        example_post: string;
        example_auth: string;
    };
}

type Language = 'python' | 'javascript' | 'node' | 'go' | 'php';

export default function CurlConverterClient({ labels }: CurlConverterClientProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState<Language>('python');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError('');
            return;
        }

        try {
            const parsed = parseCurl(input);
            if (!parsed || !parsed.url) {
                throw new Error('Invalid cURL');
            }

            let code = '';
            switch (language) {
                case 'python':
                    code = generatePython(parsed);
                    break;
                case 'javascript':
                    code = generateJavascript(parsed);
                    break;
                case 'node':
                    code = generateNode(parsed);
                    break;
                case 'go':
                    code = generateGo(parsed);
                    break;
                case 'php':
                    code = generatePhp(parsed);
                    break;
            }
            setOutput(code);
            setError('');
        } catch (e) {
            console.error(e);
            setError(labels.error_invalid_curl);
            setOutput('');
        }
    }, [input, language, labels.error_invalid_curl]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const languages: { id: Language; label: string }[] = [
        { id: 'python', label: labels.lang_python },
        { id: 'javascript', label: labels.lang_javascript },
        { id: 'node', label: labels.lang_node },
        { id: 'go', label: labels.lang_go },
        { id: 'php', label: labels.lang_php },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                    <Terminal className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    {labels.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{labels.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Left Column */}
                <div className="flex flex-col h-full gap-4">
                    {/* Input Section */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {labels.input_label}
                            </label>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={labels.input_placeholder}
                            className="flex-1 w-full p-4 bg-transparent border-none resize-none focus:ring-0 text-sm font-mono text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            spellCheck={false}
                        />
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Examples Section */}
                    <div className="flex flex-wrap gap-2 items-center justify-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            {labels.examples_label}
                        </span>
                        <button
                            onClick={() => setInput('curl https://api.example.com/users')}
                            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                            {labels.example_get}
                        </button>
                        <button
                            onClick={() => setInput(`curl -X POST https://api.example.com/users \\
-H "Content-Type: application/json" \\
-d '{"name": "John", "email": "john@example.com"}'`)}
                            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                            {labels.example_post}
                        </button>
                        <button
                            onClick={() => setInput(`curl -X GET https://api.example.com/dashboard \\
-H "Authorization: Bearer YOUR_TOKEN" \\
-H "Accept: application/json"`)}
                            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                            {labels.example_auth}
                        </button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="flex flex-col h-full bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
                    <div className="flex items-center justify-between p-2 border-b border-gray-700 bg-[#252526]">
                        <div className="flex gap-1 overflow-x-auto no-scrollbar">
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setLanguage(lang.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${language === lang.id
                                        ? 'bg-[#37373d] text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="flex-shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-[#37373d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? labels.copied : labels.copy_button}
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar relative">
                        {output ? (
                            <SyntaxHighlighter
                                language={language === 'node' ? 'javascript' : language}
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    background: 'transparent',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                }}
                                wrapLines={true}
                                wrapLongLines={true}
                            >
                                {output}
                            </SyntaxHighlighter>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                                {labels.output_label}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Code Generators
function generatePython(parsed: any) {
    const headers = parsed.header || {};
    const method = parsed.method || 'GET';
    const data = parsed.body;

    let code = `import requests\n\n`;
    code += `url = "${parsed.url}"\n`;

    if (Object.keys(headers).length > 0) {
        code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
    }

    if (data) {
        code += `data = ${JSON.stringify(data)}\n`;
    }

    code += `\nresponse = requests.${method.toLowerCase()}(url`;
    if (Object.keys(headers).length > 0) code += `, headers=headers`;
    if (data) code += `, data=data`;
    code += `)\n\nprint(response.text)`;

    return code;
}

function generateJavascript(parsed: any) {
    const headers = parsed.header || {};
    const method = parsed.method || 'GET';
    const data = parsed.body;

    let options: any = { method };
    if (Object.keys(headers).length > 0) options.headers = headers;
    if (data) options.body = data;

    return `fetch("${parsed.url}", ${JSON.stringify(options, null, 4)})\n  .then(response => response.json())\n  .then(data => console.log(data));`;
}

function generateNode(parsed: any) {
    const headers = parsed.header || {};
    const method = parsed.method || 'GET';
    const data = parsed.body;

    let code = `const axios = require('axios');\n\n`;
    code += `let config = {\n  method: '${method.toLowerCase()}',\n  url: '${parsed.url}',\n`;

    if (Object.keys(headers).length > 0) {
        code += `  headers: ${JSON.stringify(headers, null, 4).replace(/"/g, "'")},\n`;
    }
    if (data) {
        code += `  data: ${JSON.stringify(data)}\n`;
    }
    code += `};\n\naxios(config)\n.then((response) => {\n  console.log(JSON.stringify(response.data));\n})\n.catch((error) => {\n  console.log(error);\n});`;

    return code;
}

function generateGo(parsed: any) {
    const headers = parsed.header || {};
    const method = parsed.method || 'GET';
    const data = parsed.body;

    let code = `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"io/ioutil"\n`;
    if (data) code += `\t"strings"\n`;
    code += `)\n\nfunc main() {\n\n\turl := "${parsed.url}"\n`;

    if (data) {
        code += `\tpayload := strings.NewReader("${data.replace(/"/g, '\\"')}")\n`;
        code += `\treq, _ := http.NewRequest("${method}", url, payload)\n`;
    } else {
        code += `\treq, _ := http.NewRequest("${method}", url, nil)\n`;
    }

    Object.entries(headers).forEach(([key, value]) => {
        code += `\treq.Header.Add("${key}", "${value}")\n`;
    });

    code += `\n\tres, _ := http.DefaultClient.Do(req)\n\n\tdefer res.Body.Close()\n\tbody, _ := ioutil.ReadAll(res.Body)\n\n\tfmt.Println(res)\n\tfmt.Println(string(body))\n}`;
    return code;
}

function generatePhp(parsed: any) {
    const headers = parsed.header || {};
    const method = parsed.method || 'GET';
    const data = parsed.body;

    let code = `<?php\n\n$curl = curl_init();\n\ncurl_setopt_array($curl, array(\n`;
    code += `  CURLOPT_URL => '${parsed.url}',\n`;
    code += `  CURLOPT_RETURNTRANSFER => true,\n`;
    code += `  CURLOPT_ENCODING => '',\n`;
    code += `  CURLOPT_MAXREDIRS => 10,\n`;
    code += `  CURLOPT_TIMEOUT => 0,\n`;
    code += `  CURLOPT_FOLLOWLOCATION => true,\n`;
    code += `  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n`;
    code += `  CURLOPT_CUSTOMREQUEST => '${method}',\n`;

    if (data) {
        code += `  CURLOPT_POSTFIELDS => '${data}',\n`;
    }

    if (Object.keys(headers).length > 0) {
        code += `  CURLOPT_HTTPHEADER => array(\n`;
        Object.entries(headers).forEach(([key, value]) => {
            code += `    '${key}: ${value}',\n`;
        });
        code += `  ),\n`;
    }

    code += `));\n\n$response = curl_exec($curl);\n\ncurl_close($curl);\necho $response;`;
    return code;
}
