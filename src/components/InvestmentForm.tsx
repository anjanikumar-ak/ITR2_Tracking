import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Investment } from '../types';
import React from 'react';

const investmentSchema = z.object({
  investments: z.array(z.object({
    stock_code: z.string().min(1, 'Stock code is required'),
    investment_type: z.enum(['ESPP', 'RSU']),
    stock_quantity: z.number().min(1, 'Quantity must be at least 1'),
    stock_price: z.string().min(1, 'Stock price is required'),
    investment_date: z.string().min(1, 'Investment date is required'),
  }))
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

interface Props {
  onSubmit: (data: Investment[]) => void;
  isLoading: boolean;
}

export function InvestmentForm({ onSubmit, isLoading }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investments: [{ stock_code: '', investment_type: 'ESPP', stock_quantity: 0, stock_price: '', investment_date: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'investments'
  });

  const onFormSubmit = (data: InvestmentFormData) => {
    onSubmit(data.investments);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Code</label>
              <input
                {...register(`investments.${index}.stock_code`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.stock_code && (
                <p className="mt-1 text-sm text-red-600">{errors.investments[index]?.stock_code?.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                {...register(`investments.${index}.investment_type`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="ESPP">ESPP</option>
                <option value="RSU">RSU</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                {...register(`investments.${index}.stock_quantity`, { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.stock_quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.investments[index]?.stock_quantity?.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                {...register(`investments.${index}.stock_price`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.stock_price && (
                <p className="mt-1 text-sm text-red-600">{errors.investments[index]?.stock_price?.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                {...register(`investments.${index}.investment_date`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.investment_date && (
                <p className="mt-1 text-sm text-red-600">{errors.investments[index]?.investment_date?.message}</p>
              )}
            </div>
          </div>

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => append({ stock_code: '', investment_type: 'ESPP', stock_quantity: 0, stock_price: '', investment_date: '' })}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isLoading}
        >
          Add Investment
        </button>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Computing...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}