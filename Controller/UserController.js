const user_db = require(`../Model/UserModel`);
const ErrorHandler = require(`../Util/ErrorHandler`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);

const Get_allUser = AsyncWrapper(async (req, res) => {
  const all_User = await user_db.find({});
  res
    .status(200)
    .json({ Status: "Success", length: all_User.length, Data: { all_User } });
});
const Get_User = AsyncWrapper(async (req, res, next) => {
  const user_id = req.params.user_id;
  const user = await user_db.findById(user_id);
  if (!user) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  res.status(200).json({ Status: "Success", data: { user } });
});

const Create_User = AsyncWrapper(async (req, res) => {
  const new_user = await user_db.create(req.body);
  res.status(201).json({ Status: "Success", data: { new_user } });
});

const Update_User = AsyncWrapper(async (req, res) => {
  const Modify_user = await user_db.findByIdAndUpdate(
    { _id: req.params.user_id },
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ Status: "Success", data: { Modify_user } });
});

const Delete_User = AsyncWrapper(async (req, res) => {
  const user_id = req.params.user_id;
  if (!req.params.user_id) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  await user_db.findByIdAndDelete({ _id: user_id });
  res.status(200).json({ Status: "Success", data: "null" });
});

module.exports = {
  Get_allUser,
  Get_User,
  Create_User,
  Update_User,
  Delete_User,
};
