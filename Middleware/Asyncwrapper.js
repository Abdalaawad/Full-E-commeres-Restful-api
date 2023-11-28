const asyncwrapper = (asyncfn) => {
  return (req, res, next) => {
    asyncfn(req, res, next).catch((error) => {
      next(error);
    });
  };
};

module.exports = asyncwrapper;
