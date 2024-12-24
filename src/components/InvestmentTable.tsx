import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ComputedInvestment } from '../types.js';
import React from 'react';

const columnHelper = createColumnHelper<ComputedInvestment>();

const columns = [
  columnHelper.accessor('stock_code', {
    header: 'Stock Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('investment_type', {
    header: 'Type',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('stock_quantity', {
    header: 'Quantity',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('stock_price', {
    header: 'Price ($)',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('investment_date', {
    header: 'Investment Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('investment_value_USD', {
    header: 'Value (USD)',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('investment_value_INR', {
    header: 'Value (INR)',
    cell: info => `₹${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('peak_value_USD', {
    header: 'Peak Value (USD)',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('peak_value_INR', {
    header: 'Peak Value (INR)',
    cell: info => `₹${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('closing_value_USD', {
    header: 'Closing Value (USD)',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),

  columnHelper.accessor('closing_value_INR', {
    header: 'Closing Value (INR)',
    cell: info => `₹${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('total_dividend_USD', {
    header: 'Dividends (USD)',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('total_dividend_INR', {
    header: 'Dividends (INR)',
    cell: info => `₹${info.getValue().toFixed(2)}`,
  }),
];

interface Props {
  data: ComputedInvestment[];
}

export function InvestmentTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}