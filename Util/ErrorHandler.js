class ErrorHandler extends Error {
  constructor(message, statuscode, status) {
    super();
    this.message = message;
    this.statuscode = statuscode;
    this.status = status;
    return this;
  }
}

module.exports = ErrorHandler;
