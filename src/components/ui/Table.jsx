import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Button from './Button';

export default function Table({ columns, data, onEdit, onDelete, loading, error }) {
  if (loading) return <div className="p-4 text-center text-gray-500">Loading data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">No data available.</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.label || col}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr key={item._id || item.id || idx} className="hover:bg-gray-50">
              {columns.map((col, colIdx) => {
                const key = col.key || col;
                const value = item[key];
                return (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof value === 'boolean' 
                      ? (value ? 'Yes' : 'No') 
                      : typeof value === 'object' && value !== null 
                        ? JSON.stringify(value).substring(0, 30) + '...'
                        : String(value || '').substring(0, 50)}
                  </td>
                );
              })}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <FiEdit className="inline w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900">
                  <FiTrash2 className="inline w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
