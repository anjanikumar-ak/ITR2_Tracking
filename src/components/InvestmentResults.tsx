import React from 'react';
import { InvestmentTable } from './InvestmentTable';
import { ComputedInvestment } from '../types';

interface InvestmentResultsProps {
  data: ComputedInvestment[];
}

export function InvestmentResults({ data }: InvestmentResultsProps) {
  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Investment Results</h2>
      </div>
      <InvestmentTable data={data} />
    </div>
  );
}