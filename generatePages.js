import fs from "fs";
import path from "path";
import { ENTITY_CONFIG } from "./src/utils/entityConfig.js";
import { API_MEDIA_URL } from "./src/api/axios.js";

const __dirname = path.resolve();
const pagesDir = path.join(__dirname, "src", "pages", "entities");

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Ensure the first character is uppercase
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const generateListTemplate = (entityKey, config) => {
  const componentName = `${capitalize(entityKey)}List`;
  return `import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiBox } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getEntityConfig } from '../../utils/entityConfig';
import { API_MEDIA_URL } from '../../api/axios';

export default function ${componentName}() {
  const entity = '${entityKey}';
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
          to={\`/admin/\${entity}/create\`}
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
              placeholder={\`Search \${config.title.toLowerCase()}...\`}
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
                            <img src={\`\${API_MEDIA_URL}\${val}\`} alt={col} className="h-10 w-10 object-cover rounded-md border border-slate-200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40?text=No+Img' }} />
                          ) : typeof val === 'boolean' ? (
                            <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${val ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}\`}>
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
                          to={\`/admin/\${entity}/edit/\${item._id || item.id}\`}
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
`;
};

const generateFormTemplate = (entityKey, config) => {
  const componentName = `${capitalize(entityKey)}Form`;
  return `import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm as useRHForm } from 'react-hook-form';
import { FiArrowLeft, FiSave, FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getEntityConfig } from '../../utils/entityConfig';
import { API_MEDIA_URL } from '../../api/axios';

export default function ${componentName}() {
  const entity = '${entityKey}';
  const { id } = useParams();
  const navigate = useNavigate();
  const config = getEntityConfig(entity);
  const isEditMode = Boolean(id);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useRHForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);

  const [files, setFiles] = useState({});
  const [existingData, setExistingData] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setFetching(true);
      const res = await config.api.getById(id);
      const item = res.data?.data || res.data || res;
      setExistingData(item);

      config.fields.forEach(field => {
        if (field.type !== 'file') {
          if (field.isArray && Array.isArray(item[field.name])) {
            setValue(field.name, item[field.name].join(', '));
          } else {
            setValue(field.name, item[field.name]);
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch item details');
      navigate(\`/admin/\${entity}\`);
    } finally {
      setFetching(false);
    }
  };

  const handleFileChange = (e, fieldName, isMultiple) => {
    if (isMultiple) {
      setFiles(prev => ({ ...prev, [fieldName]: Array.from(e.target.files) }));
    } else {
      setFiles(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const hasFiles = config.fields.some(f => f.type === 'file');
      let payload;

      if (hasFiles) {
        payload = new FormData();
        Object.keys(data).forEach(key => {
          const fieldConf = config.fields.find(f => f.name === key);
          if (fieldConf && fieldConf.type !== 'file') {
             if (fieldConf.isArray) {
                const arr = data[key] ? data[key].split(',').map(s => s.trim()).filter(s => s) : [];
                arr.forEach(val => payload.append(\`\${key}[]\`, val));
             } else if (fieldConf.type === 'checkbox') {
                payload.append(key, data[key] ? 'true' : 'false');
             } else {
                if (data[key] !== undefined && data[key] !== null) {
                  payload.append(key, data[key]);
                }
             }
          }
        });

        Object.keys(files).forEach(key => {
          const fileData = files[key];
          if (Array.isArray(fileData)) {
            fileData.forEach(f => payload.append(key, f));
          } else if (fileData) {
            payload.append(key, fileData);
          }
        });
      } else {
        payload = { ...data };
        config.fields.forEach(fieldConf => {
           if (fieldConf.isArray && typeof payload[fieldConf.name] === 'string') {
              payload[fieldConf.name] = payload[fieldConf.name].split(',').map(s => s.trim()).filter(s => s);
           }
        });
      }

      if (isEditMode) {
        await config.api.update(id, payload);
        toast.success('Item updated successfully');
      } else {
        await config.api.create(payload);
        toast.success('Item created successfully');
      }

      navigate(\`/admin/\${entity}\`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!config) return null;

  return (
    <div className="w-full mx-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(\`/admin/\${entity}\`)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {isEditMode ? 'Edit' : 'Create'} {config.title.replace(/s$/, '')}
            </h1>

          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {fetching ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Loading form data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.fields.map(field => (
                <div key={field.name} className={\`\${field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}\`}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === 'text' || field.type === 'number' ? (
                    <input
                      type={field.type}
                      {...register(field.name, { required: field.required })}
                      className={\`block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors \${errors[field.name] ? 'border-red-500 ring-red-500' : ''}\`}
                      placeholder={\`Enter \${field.label.toLowerCase()}\`}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      {...register(field.name, { required: field.required })}
                      rows="4"
                      className={\`block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors \${errors[field.name] ? 'border-red-500 ring-red-500' : ''}\`}
                      placeholder={\`Enter \${field.label.toLowerCase()}\`}
                    ></textarea>
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-center space-x-3 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        {...register(field.name)}
                        className="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2 transition-all cursor-pointer"
                      />
                      <span className="text-sm font-medium text-slate-700 select-none">Enable {field.label}</span>
                    </label>
                  ) : field.type === 'file' ? (
                    <div className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-primary-400 transition-colors bg-slate-50">
                      {existingData[field.name] && !files[field.name] && (
                        <div className="mb-4 flex justify-center">
                          {Array.isArray(existingData[field.name]) ? (
                            <div className="flex space-x-2 overflow-x-auto">
                               {existingData[field.name].map((img, idx) => (
                                 <img key={idx} src={\`\${API_MEDIA_URL}\${img}\`} alt="preview" className="h-16 w-16 object-cover rounded-md border border-slate-200" />
                               ))}
                            </div>
                          ) : typeof existingData[field.name] === 'string' && (
                            <img src={\`\${API_MEDIA_URL}\${existingData[field.name]}\`} alt="preview" className="h-20 w-20 object-cover rounded-md border border-slate-200" />
                          )}
                        </div>
                      )}
                      <div className="space-y-2 text-center">
                        <FiUploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label htmlFor={\`file-upload-\${field.name}\`} className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 px-2 py-0.5">
                            <span>Upload a file</span>
                            <input
                              id={\`file-upload-\${field.name}\`}
                              type="file"
                              multiple={field.multiple}
                              onChange={(e) => handleFileChange(e, field.name, field.multiple)}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">
                          {files[field.name]
                            ? (Array.isArray(files[field.name]) ? \`\${files[field.name].length} files selected\` : files[field.name].name)
                            : "PNG, JPG, GIF up to 10MB"}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {errors[field.name] && <span className="text-red-500 text-xs font-medium mt-1 block">This field is required</span>}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate(\`/admin/\${entity}\`)}
                className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div> Saving...</>
                ) : (
                  <><FiSave className="mr-2 w-4 h-4" /> Save {config.title.replace(/s$/, '')}</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
`;
};

Object.keys(ENTITY_CONFIG).forEach((entityKey) => {
  const config = ENTITY_CONFIG[entityKey];

  const listCode = generateListTemplate(entityKey, config);
  const formCode = generateFormTemplate(entityKey, config);

  fs.writeFileSync(
    path.join(pagesDir, `${capitalize(entityKey)}List.jsx`),
    listCode,
  );
  fs.writeFileSync(
    path.join(pagesDir, `${capitalize(entityKey)}Form.jsx`),
    formCode,
  );
});

console.log("Successfully generated 38 component files in src/pages/entities/");
