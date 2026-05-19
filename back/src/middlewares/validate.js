const validate = (schema) => (req, res, next) => {
  if (schema) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
  }
  next();
};
module.exports = validate;