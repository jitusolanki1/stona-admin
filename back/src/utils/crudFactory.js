const asyncHandler = require('../middlewares/asyncHandler');

exports.createOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.create(req.body);
  res.status(201).json(doc);
});

exports.getAll = (Model) => asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, sort, fields, ...filters } = req.query;

  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  const filterObj = { ...filters };
  excludedFields.forEach(el => delete filterObj[el]);

  let queryStr = JSON.stringify(filterObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  const finalFilters = JSON.parse(queryStr);

  if (search) {
    finalFilters.$or = [
      { name: { $regex: search, $options: 'i' } },
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  let query = Model.find(finalFilters);

  if (sort) {
    const sortBy = sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  if (fields) {
    const fieldsBy = fields.split(',').join(' ');
    query = query.select(fieldsBy);
  } else {
    query = query.select('-__v');
  }

  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(Number(limit));

  const docs = await query;
  const total = await Model.countDocuments(finalFilters);

  res.json({
    status: 'success',
    results: docs.length,
    total,
    page: Number(page),
    limit: Number(limit),
    data: docs
  });
});

exports.getOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findById(req.params.id);
  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }
  res.json(doc);
});

exports.updateOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }
  res.json(doc);
});

exports.deleteOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }
  res.json({ message: 'Deleted successfully' });
});
