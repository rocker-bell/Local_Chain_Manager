
export const sendSuccess = (res, data, message = 'Success') => {
  return res.json({ success: true, message, data });
};

export const sendError = (res, error = 'Error', code = 500) => {
  return res.status(code).json({ success: false, message: error });
};