import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm as useRHForm } from 'react-hook-form';
import { FiArrowLeft, FiSave, FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getEntityConfig } from '../utils/entityConfig';
import api, { API_MEDIA_URL } from '../api/axios';

export default function DynamicForm() {
  const { entity, id } = useParams();
  const navigate = useNavigate();
  const config = getEntityConfig(entity);
  const isEditMode = Boolean(id);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useRHForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [selectOptions, setSelectOptions] = useState({});

  const [files, setFiles] = useState({});
  const [existingData, setExistingData] = useState({});
  const selectedProductSlug = watch('productSlug');

  useEffect(() => {
    if (entity !== 'tileSizes' || !selectedProductSlug) return;

    const selectedProduct = (selectOptions.products || []).find((option) => option.value === selectedProductSlug);
    if (!selectedProduct) return;

    setValue('productName', selectedProduct.labelWithoutMeta || selectedProduct.label);

    const mappedCategory = selectOptions.productCategoryBySlug?.[selectedProductSlug];
    if (mappedCategory) {
      setValue('category', mappedCategory);
    }
  }, [entity, selectedProductSlug, selectOptions, setValue]);

  const getFieldValue = (source, fieldName) => {
    return fieldName.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), source);
  };

  useEffect(() => {
    if (!config) {
      navigate('/admin');
      return;
    }

    loadSelectOptions();

    if (isEditMode) {
      fetchItem();
    }
  }, [entity, id]);

  const loadSelectOptions = async () => {
    try {
      const nextOptions = {};
      const categoryFieldExists = config.fields.some(field => field.type === 'select' && field.optionsSource === 'categories');
      const productFieldExists = config.fields.some(field => field.type === 'select' && field.optionsSource === 'products');

      if (categoryFieldExists) {
        const res = await api.get('/categories', { params: { limit: 1000 } });
        const categories = res?.data?.data || res?.data || [];
        nextOptions.categories = Array.isArray(categories)
          ? categories.map((item) => ({ label: item.name, value: item.slug }))
          : [];
      }

      if (productFieldExists) {
        const res = await api.get('/products', { params: { limit: 1000, fields: 'name,slug,category' } });
        const products = res?.data?.data || res?.data || [];

        nextOptions.products = Array.isArray(products)
          ? products.map((item) => ({
            label: `${item.name}${item.category ? ` (${item.category})` : ''}`,
            labelWithoutMeta: item.name,
            value: item.slug,
          }))
          : [];

        nextOptions.productCategoryBySlug = Array.isArray(products)
          ? products.reduce((acc, item) => {
            if (item?.slug && item?.category) acc[item.slug] = item.category;
            return acc;
          }, {})
          : {};
      }

      setSelectOptions(nextOptions);
    } catch (error) {
      console.error('Failed to load select options', error);
    }
  };

  const fetchItem = async () => {
    try {
      setFetching(true);
      const res = await config.api.getById(id);
      const item = res.data?.data || res.data || res;
      setExistingData(item);

      config.fields.forEach(field => {
        if (field.type !== 'file') {
          const val = getFieldValue(item, field.name);
          if (field.isArray && Array.isArray(val)) {
            setValue(field.name, val.join(', '));
          } else if (field.name === 'roomKey' && !val && item.room) {
            const normalizedRoom = String(item.room)
              .replace(/\s+/g, '')
              .replace(/^LivingRoom$/i, 'livingRoom')
              .replace(/^Bathroom$/i, 'bathroom')
              .replace(/^Kitchen$/i, 'kitchen')
              .replace(/^Bedroom$/i, 'bedroom')
              .replace(/^Outdoor$/i, 'outdoor')
              .replace(/^All$/i, 'all');
            setValue(field.name, normalizedRoom);
          } else {
            setValue(field.name, val);
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch item details');
      navigate(`/admin/${entity}`);
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
        config.fields.forEach(fieldConf => {
          if (fieldConf.type !== 'file') {
            const val = getFieldValue(data, fieldConf.name);
            if (fieldConf.isArray) {
              const arr = val ? String(val).split(',').map(s => s.trim()).filter(s => s) : [];
              arr.forEach(v => payload.append(fieldConf.name, v));
            } else if (fieldConf.type === 'checkbox') {
              payload.append(fieldConf.name, val ? 'true' : 'false');
            } else {
              if (val !== undefined && val !== null) {
                payload.append(fieldConf.name, val);
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

      navigate(`/admin/${entity}`);
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
            onClick={() => navigate(`/admin/${entity}`)}
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
              {config.fields.map((field, index) => {
                const groupChanged = index === 0 || field.group !== config.fields[index - 1]?.group;
                const fieldOptions = field.options
                  || (field.optionsSource === 'categories'
                    ? (selectOptions.categories || [])
                    : field.optionsSource === 'products'
                      ? (selectOptions.products || [])
                      : []);

                return (
                  <div key={field.name} className={`${field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}`}>
                    {groupChanged && field.group && (
                      <div className="md:col-span-2 pt-2">
                        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">{field.group}</h2>
                      </div>
                    )}
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === 'text' || field.type === 'number' ? (
                      <input
                        type={field.type}
                        {...register(field.name, { required: field.required })}
                        className={`block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors ${errors[field.name] ? 'border-red-500 ring-red-500' : ''}`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        {...register(field.name, { required: field.required })}
                        className={`block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors ${errors[field.name] ? 'border-red-500 ring-red-500' : ''}`}
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {fieldOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        {...register(field.name, { required: field.required })}
                        rows="4"
                        className={`block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors ${errors[field.name] ? 'border-red-500 ring-red-500' : ''}`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
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
                        {(() => {
                          const existingVal = field.name.split('.').reduce((o, i) => (o ? o[i] : undefined), existingData);
                          return existingVal && !files[field.name] && (
                            <div className="mb-4 flex justify-center">
                              {Array.isArray(existingVal) ? (
                                <div className="flex space-x-2 overflow-x-auto">
                                  {existingVal.map((img, idx) => (
                                    <img key={idx} src={`${API_MEDIA_URL}${img}`} alt="preview" className="h-16 w-16 object-cover rounded-md border border-slate-200" />
                                  ))}
                                </div>
                              ) : typeof existingVal === 'string' && (
                                <img src={`${API_MEDIA_URL}${existingVal}`} alt="preview" className="h-20 w-20 object-cover rounded-md border border-slate-200" />
                              )}
                            </div>
                          );
                        })()}
                        <div className="space-y-2 text-center">
                          <FiUploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                          <div className="flex text-sm text-slate-600 justify-center">
                            <label htmlFor={`file-upload-${field.name}`} className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 px-2 py-0.5">
                              <span>Upload a file</span>
                              <input
                                id={`file-upload-${field.name}`}
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
                              ? (Array.isArray(files[field.name]) ? `${files[field.name].length} files selected` : files[field.name].name)
                              : "PNG, JPG, GIF up to 10MB"}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {errors[field.name] && <span className="text-red-500 text-xs font-medium mt-1 block">This field is required</span>}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate(`/admin/${entity}`)}
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
