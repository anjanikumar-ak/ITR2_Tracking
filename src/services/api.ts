import axios from 'axios';
import { Investment, ComputedInvestment } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function computeInvestments(investments: Investment[]): Promise<ComputedInvestment[]> {
  try {
    const response = await api.post('/compute', investments);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to compute investment data');
    }
    throw new Error('An unexpected error occurred');
  }
}