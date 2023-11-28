const Errorhandler = (error, req, res, next) => {
  res.status(error.statuscode || 500).json({
    Status: error.status,
    Message: error.message,
    Stack: error.stack,
    // if (process.env.development === "development") {
    //   DevelopError(error, res);
    // } else {
    //   ClientError(error, res);
    // }
  });
};

// const DevelopError = (error, res) => {
//   return res.status(error.statuscode || 500).json({
//     Status: error.status,
//     Message: error.message,
//     Stack: error.stack,
//   });
// };
// const ClientError = (error, res) => {
//   return res.status(error.statuscode || 500).json({
//     Status: error.status,
//     Message: error.message,
//   });
// };

module.exports = Errorhandler;
