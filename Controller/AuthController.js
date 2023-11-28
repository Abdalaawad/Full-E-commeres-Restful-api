const user_db = require(`../Model/UserModel`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);
const ErrorHandler = require(`../Util/ErrorHandler`);
const jwt = require(`../Util/JsonWebToken`);
const bcrypt = require(`bcrypt`);
const crypto = require(`crypto`);
const SendEmail = require(`../Util/Email`);

const Signup = AsyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, 9);
  const create_email = await user_db.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    role,
  });
  const token = jwt({
    firstName: create_email.firstName,
    email: create_email.email,
    role: create_email.role,
  });
  create_email.token = token;
  res.status(201).json({ Status: "Success", Data: { create_email } });
});

const Login = AsyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await user_db.findOne({ email: email });
  if (!user) {
    const error = new ErrorHandler(
      "This Email Don`t Exist Please Register First",
      404,
      "Error"
    );
    return next(error);
  }
  const originalPassword = bcrypt.compare(password, user.password);
  if (!originalPassword) {
    const error = new ErrorHandler("This Password Not Correct", 404, "Error");
    return next(error);
  }
  if (user && originalPassword) {
    const token = jwt({
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    });
    res.status(200).json({ Status: "Success", data: { token } });
  }
});

const ForgetPassword = async (req, res) => {
  // i want to know this email is exist or no
  const { email } = req.body;
  const Email = await user_db.findOne({ email: email });
  if (!Email) {
    const error = new ErrorHandler("Please Entre Email", 404, "Error");
    return next(error);
  }
  Email.PasswordResetToken = PasswordResetToken;
  Email.PasswordResetTokenExpire = PasswordResetTokenExpire;

  await Email.save({ validateBeforeSave: false });
  // generate token to send to user email even know reset his password
  const ResetToken = crypto.randomBytes(32).toString("hex");
  console.log(ResetToken);
  const PasswordResetToken = crypto
    .createHash(`sha256`)
    .update(ResetToken)
    .digest(`hex`);
  const PasswordResetTokenExpire = Data.now() + 10 * 60 * 1000;
  const ResetUrl = `${req.protocol}//${req.get(
    `host`
  )}/localhost:4000/Api/v1/user/forgetpassword/${ResetToken}`;
  SendEmail({
    to: Email.email,
    subject: "reset your password",
    massage: ResetUrl,
  });
};

const ResetPassword = async (req, res, next) => {
  const token = crypto
    .createHash(`sha256`)
    .update(req.params.token)
    .digest(`hex`);

  const user = await user_db.FindOne({
    PasswordResetToken: token,
    PasswordResetTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    const error = new ErrorHandler("This Token Not Exist", 400, "Error");
    return next(error);
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.PasswordResetToken = undefined;
  user.PasswordResetTokenExpire = undefined;
  await user.save();
};

module.exports = {
  Login,
  Signup,
  ForgetPassword,
  // ResetPassword,
};
