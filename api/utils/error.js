export const errorHandler = (statusCode, message) => {
  console.log("hey error handler is called");
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
