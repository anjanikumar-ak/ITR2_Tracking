import React, { useState } from 'react';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage';
import { InvestmentForm } from './components/InvestmentForm';
import { InvestmentResults } from './components/InvestmentResults';
import { Investment, ComputedInvestment } from './types';
import { computeInvestments } from './services/api';

function App() {
  const [computedData, setComputedData] = useState<ComputedInvestment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (investments: Investment[]) => {
    try {
      setLoading(true);
      setError(null);
      const data = await computeInvestments(investments);
      setComputedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compute investment data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Investments</h2>
          <InvestmentForm onSubmit={handleSubmit} isLoading={loading} />
        </div>

        {error && <ErrorMessage message={error} />}
        <InvestmentResults data={computedData} />
      </div>
    </div>
  );
}

export default App;