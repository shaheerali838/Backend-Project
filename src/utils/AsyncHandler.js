const AsyncHandler = (requestHandler) => {
  (req, res, next) =>
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
};

export { AsyncHandler };

// const AsyncHandler2 = (fnc) => async (req, res, next) => {
//   try {
//     await fnc(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
