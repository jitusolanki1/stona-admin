import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiBox } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getEntityConfig } from '../../utils/entityConfig';
import { API_MEDIA_URL } from '../../api/axios';

export default function HomeApplicationAreasList() {
  const entity = 'homeApplicationAreas';
  const config = getEntityConfig(entity);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await config.api.getAll({ page, limit: 10, search: debouncedSearch });
      const items = res.data?.data || res.data || res;
      setData(Array.isArray(items) ? items : []);
      setTotalPages(res.data?.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await config.api.delete(id);
        toast.success('Item deleted successfully');
        fetchData();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete item');
      }
    }
  };

  if (!config) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{config.title}</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view all {config.title.toLowerCase()}.</p>
        </div>
        <Link
          to={`/admin/${entity}/create`}
          className="inline-flex items-center justify-center bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 shadow-sm transition-all focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <FiPlus className="mr-2 w-4 h-4" /> Add New {config.title.replace(/s$/, '')}
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-slate-400 w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={`Search ${config.title.toLowerCase()}...`}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {config.columns.map(col => {
                  const fieldConfig = config.fields.find(f => f.name === col);
                  const label = fieldConfig ? fieldConfig.label : col;
                  return (
                    <th key={col} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {label}
                    </th>
                  );
                })}
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-sm font-medium">Loading data...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr><td colSpan={config.columns.length + 1} className="px-6 py-8 text-center text-red-500 font-medium">{error}</td></tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <FiBox className="w-12 h-12 mb-3 text-slate-300" />
                      <p className="text-base font-medium text-slate-900">No {config.title.toLowerCase()} found</p>
                      <p className="text-sm mt-1">Get started by creating a new one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-slate-50/50 transition-colors">
                    {config.columns.map(col => {
                      const val = item[col];
                      const fieldConfig = config.fields.find(f => f.name === col);
                      const isImageField = fieldConfig?.type === 'file' || col.toLowerCase().includes('image') || col.toLowerCase().includes('avatar') || col.toLowerCase().includes('cover');

                      return (
                        <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          {isImageField && val ? (
                            <img src={`${API_MEDIA_URL}${val}`} alt={col} className="h-10 w-10 object-cover rounded-md border border-slate-200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40?text=No+Img' }} />
                          ) : typeof val === 'boolean' ? (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                              {val ? 'Yes' : 'No'}
                            </span>
                          ) : typeof val === 'object' && val !== null ? (
                            JSON.stringify(val).substring(0, 30)
                          ) : (
                            <span className="font-medium text-slate-900">{String(val || '—').substring(0, 50)}</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          to={`/admin/${entity}/edit/${item._id || item.id}`}
                          className="text-primary-600 hover:text-primary-900 bg-primary-50 hover:bg-primary-100 p-2 rounded-md transition-colors"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id || item.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="text-sm text-slate-500">
            Showing page <span className="font-medium text-slate-900">{page}</span> of <span className="font-medium text-slate-900">{totalPages}</span>
          </div>
          <div className="flex space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-md bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="mr-1 w-4 h-4" /> Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-md bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next <FiChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
