const category_db = require(`../Model/CategoryModel`);
const slugify = require(`slugify`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);
const ErrorHandler = require(`../Util/ErrorHandler`);

const Getall_category = AsyncWrapper(async (req, res) => {
  // pagination
  const limit = req.query.limit * 1 || 20;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  // query

  const All_category = await category_db
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    Status: "Success",
    length: All_category.length,
    page: page,
    data: { All_category },
  });
});

const Get_category = AsyncWrapper(async (req, res, next) => {
  const category_id = req.params.category_id;
  const category = await category_db.findById(category_id);
  if (!category) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  res.status(200).json({ Status: "Success", data: { category } });
});

const Create_category = AsyncWrapper(async (req, res) => {
  const { name } = req.body;

  const new_category = await category_db.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ Status: "Success", data: { new_category } });
});

const Update_category = AsyncWrapper(async (req, res) => {
  const { name } = req.body;
  const Modify_category = await category_db.findByIdAndUpdate(
    { _id: req.params.subcategory_id },
    { $set: { name, slug: slugify(name) } },
    { new: true }
  );
  res.status(200).json({ Status: "Success", data: { Modify_category } });
});

const Delete_category = AsyncWrapper(async (req, res) => {
  if (!category_id) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  await category_db.findByIdAndDelete({ _id: category_id });
  res.status(200).json({ Status: "Success", data: "null" });
});

module.exports = {
  Getall_category,
  Get_category,
  Create_category,
  Update_category,
  Delete_category,
};
