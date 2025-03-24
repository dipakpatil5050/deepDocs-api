export const successResponse = (res, data = {}, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 400, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
