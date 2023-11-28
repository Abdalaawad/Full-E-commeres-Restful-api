const user_id = require(`../Model/UserModel`);
const jwt = require(`jsonwebtoken`);
const ErrorHandler = require(`../Util/ErrorHandler`);
const AsyncWrapper = require(`./Asyncwrapper`);

const VerifyToken = async (req, res, next) => {
  let Auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!Auth) {
    const error = new ErrorHandler("You Must Have A Token", 404, "Error");
    return next(error);
  }
  let token = Auth.split(` `)[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.permission = decode;
    const currentUser = await user_id.findById(decode.user_id);
    if (!currentUser) {
      const error = new ErrorHandler(
        "This User Don`t Exist And This token No longer Exist ",
        404,
        "Error"
      );
      return next(error);
    }
    next();
  } catch (errors) {
    const error = new ErrorHandler("Invalid Token", 401, "Error");
    return next(error);
  }
};

module.exports = VerifyToken;
