const AsyncHandler = (requestHandler) => {
  return (req, res, next) =>
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
};

export default AsyncHandler;

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
