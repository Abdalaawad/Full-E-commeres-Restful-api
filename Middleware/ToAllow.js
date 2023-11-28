const ErrorHandler = require(`../Util/ErrorHandler`);
const ToAllow = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.permission.role)) {
      const error = new ErrorHandler(
        "This Not Authorize To Do This Task",
        401,
        "Error"
      );
      return next(error);
    }
    next();
  };
};

module.exports = ToAllow;
