// backend/middleware/validation.js
export const validateQueryParams = (allowedParams = []) => (req, res, next) => {
  const invalidParams = Object.keys(req.query).filter(
    key => !allowedParams.includes(key)
  );
  if (invalidParams.length > 0) {
    return res.status(400).json({ success: false, message: `Invalid query params: ${invalidParams.join(', ')}` });
  }
  next();
};

// Make blockId optional now
export const validateBody = (requiredFields = []) => (req, res, next) => {
  // Exclude blockId from requiredFields if you want it optional
  const optionalFields = ['blockId', 'network'];
  const missingFields = requiredFields.filter(f => !(f in req.body) && !optionalFields.includes(f));
  if (missingFields.length > 0) {
    return res.status(400).json({ success: false, message: `Missing fields: ${missingFields.join(', ')}` });
  }
  next();
};