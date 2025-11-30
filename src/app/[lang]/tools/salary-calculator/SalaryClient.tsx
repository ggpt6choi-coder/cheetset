'use client';

import { useState } from 'react';

interface SalaryClientProps {
    lang: 'en' | 'ko' | 'ja';
    labels: {
        title: string;
        description: string;
        salary_input: string;
        calculate: string;
        monthly_salary: string;
        deductions: string;
        national_pension: string;
        health_insurance: string;
        care_insurance: string;
        employment_insurance: string;
        income_tax: string;
    };
}

export default function SalaryClient({ lang, labels }: SalaryClientProps) {
    const [salary, setSalary] = useState<string>('');
    const [result, setResult] = useState<{
        monthlySalary: number;
        totalDeductions: number;
        nationalPension: number;
        healthInsurance: number;
        careInsurance: number;
        employmentInsurance: number;
        incomeTax: number;
        localIncomeTax: number;
    } | null>(null);

    const handleCalculate = () => {
        const inputVal = parseFloat(salary.replace(/,/g, ''));
        if (isNaN(inputVal) || inputVal <= 0) return;

        let annualSalary = 0;
        let monthlyIncome = 0;
        let nationalPension = 0;
        let healthInsurance = 0;
        let careInsurance = 0;
        let employmentInsurance = 0;
        let incomeTax = 0;
        let localIncomeTax = 0;

        if (lang === 'ko') {
            // Korea: Input in Man-won (10,000 KRW)
            annualSalary = inputVal * 10000;
            monthlyIncome = annualSalary / 12;

            // National Pension (4.5%, Max cap ~265,500)
            nationalPension = monthlyIncome * 0.045;
            if (nationalPension > 265500) nationalPension = 265500;

            // Health Insurance (3.545%)
            healthInsurance = monthlyIncome * 0.03545;

            // Long-term Care (12.95% of Health Insurance)
            careInsurance = healthInsurance * 0.1295;

            // Employment Insurance (0.9%)
            employmentInsurance = monthlyIncome * 0.009;

            // Simplified Income Tax
            let taxRate = 0;
            if (annualSalary <= 14000000) taxRate = 0.005;
            else if (annualSalary <= 30000000) taxRate = 0.02;
            else if (annualSalary <= 50000000) taxRate = 0.05;
            else if (annualSalary <= 88000000) taxRate = 0.10;
            else if (annualSalary <= 150000000) taxRate = 0.18;
            else taxRate = 0.25;

            incomeTax = monthlyIncome * taxRate;
            localIncomeTax = incomeTax * 0.1;

        } else if (lang === 'en') {
            // US: Input in USD
            annualSalary = inputVal;
            monthlyIncome = annualSalary / 12;

            // Social Security (6.2%, capped at $168,600 annual)
            const ssCap = 168600;
            const taxableForSS = Math.min(annualSalary, ssCap);
            nationalPension = (taxableForSS * 0.062) / 12; // Monthly

            // Medicare (1.45%, no cap)
            healthInsurance = monthlyIncome * 0.0145;

            // State Tax (Est. 5% for simplicity) -> Mapped to care_insurance
            careInsurance = monthlyIncome * 0.05;

            // Employment Ins -> N/A or 401k? Set to 0 for now
            employmentInsurance = 0;

            // Federal Income Tax (Simplified 2024 Brackets for Single)
            // Standard Deduction ~$14,600
            const taxableIncome = Math.max(0, annualSalary - 14600);
            let annualTax = 0;

            if (taxableIncome <= 11600) annualTax = taxableIncome * 0.10;
            else if (taxableIncome <= 47150) annualTax = 1160 + (taxableIncome - 11600) * 0.12;
            else if (taxableIncome <= 100525) annualTax = 5426 + (taxableIncome - 47150) * 0.22;
            else if (taxableIncome <= 191950) annualTax = 17168.5 + (taxableIncome - 100525) * 0.24;
            else if (taxableIncome <= 243725) annualTax = 39110.5 + (taxableIncome - 191950) * 0.32;
            else if (taxableIncome <= 609350) annualTax = 55678.5 + (taxableIncome - 243725) * 0.35;
            else annualTax = 183647.25 + (taxableIncome - 609350) * 0.37;

            incomeTax = annualTax / 12;
            localIncomeTax = 0; // Included in State Tax est

        } else if (lang === 'ja') {
            // Japan: Input in Man-en (10,000 JPY)
            annualSalary = inputVal * 10000;
            monthlyIncome = annualSalary / 12;

            // Social Insurance (Health + Pension) ~14-15%
            // Health Insurance ~5%
            healthInsurance = monthlyIncome * 0.05;

            // Welfare Pension ~9.15%
            nationalPension = monthlyIncome * 0.0915;

            // Employment Insurance ~0.6%
            employmentInsurance = monthlyIncome * 0.006;

            // Income Tax (Simplified)
            // Deduction for employment income
            let employmentDeduction = 0;
            if (annualSalary <= 1625000) employmentDeduction = 550000;
            else if (annualSalary <= 1800000) employmentDeduction = annualSalary * 0.4 - 100000;
            else if (annualSalary <= 3600000) employmentDeduction = annualSalary * 0.3 + 80000;
            else if (annualSalary <= 6600000) employmentDeduction = annualSalary * 0.2 + 440000;
            else if (annualSalary <= 8500000) employmentDeduction = annualSalary * 0.1 + 1100000;
            else employmentDeduction = 1950000;

            const taxableIncome = Math.max(0, annualSalary - employmentDeduction - 480000); // Basic deduction

            let annualTax = 0;
            if (taxableIncome <= 1950000) annualTax = taxableIncome * 0.05;
            else if (taxableIncome <= 3300000) annualTax = taxableIncome * 0.1 - 97500;
            else if (taxableIncome <= 6950000) annualTax = taxableIncome * 0.2 - 427500;
            else if (taxableIncome <= 9000000) annualTax = taxableIncome * 0.23 - 636000;
            else if (taxableIncome <= 18000000) annualTax = taxableIncome * 0.33 - 1536000;
            else annualTax = taxableIncome * 0.40 - 2796000;

            incomeTax = annualTax / 12;

            // Resident Tax (Inhabitant Tax) ~10% of taxable income
            // Mapped to care_insurance
            careInsurance = (taxableIncome * 0.10) / 12;

            localIncomeTax = 0;
        }

        const totalDeductions = nationalPension + healthInsurance + careInsurance + employmentInsurance + incomeTax + localIncomeTax;
        const monthlySalary = monthlyIncome - totalDeductions;

        setResult({
            monthlySalary,
            totalDeductions,
            nationalPension,
            healthInsurance,
            careInsurance,
            employmentInsurance,
            incomeTax: incomeTax + localIncomeTax,
            localIncomeTax
        });
    };

    const formatCurrency = (val: number) => {
        if (lang === 'en') {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
        } else if (lang === 'ja') {
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Math.floor(val));
        }
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(Math.floor(val));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{labels.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{labels.description}</p>

            <div className="flex gap-4 mb-8 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.salary_input}</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-lg"
                        placeholder="3000"
                    />
                </div>
                <button
                    onClick={handleCalculate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md h-[52px]"
                >
                    {labels.calculate}
                </button>
            </div>

            {result && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{labels.monthly_salary}</p>
                        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(result.monthlySalary)}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white border-b pb-2">{labels.deductions}: {formatCurrency(result.totalDeductions)}</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{labels.national_pension}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.nationalPension)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{labels.health_insurance}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.healthInsurance)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{labels.care_insurance}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.careInsurance)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{labels.employment_insurance}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.employmentInsurance)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                                <span className="text-gray-600 dark:text-gray-400">{labels.income_tax}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.incomeTax)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
