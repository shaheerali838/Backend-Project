class ApiError extends Error {
  constructor(
    statusCode,
    message = "Api Error got a error in ApiError utils",
    errors = [],
    stack = ""
  ) {
    super(statusCode);
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
