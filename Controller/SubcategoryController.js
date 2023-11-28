const subcategory_db = require(`../Model/SubcategoryModel`);
const slugify = require(`slugify`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);
const ErrorHandler = require(`../Util/ErrorHandler`);

const Getall_subcategory = AsyncWrapper(async (req, res) => {
  // const category_id = req.params.category_id;

  const limit = req.query.limit * 1 || 20;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  let FilterObject = {};
  if (req.params.category_id) {
    FilterObject = { category: req.params.category_id };
  }

  const All_subcategory = await subcategory_db
    .find(FilterObject, { __v: false })
    .limit(limit)
    .skip(skip)
    .populate(`category`, `name`);

  res.status(200).json({
    Status: "Success",
    length: All_subcategory.length,
    page: page,
    data: { All_subcategory },
  });
});

const Get_subcategory = AsyncWrapper(async (req, res, next) => {
  const subcategory_id = req.params.subcategory_id;
  const subcategory = await subcategory_db.findById(subcategory_id);
  if (!subcategory) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  res.status(200).json({ Status: "Success", data: { subcategory } });
});

const Create_subcategory = AsyncWrapper(async (req, res) => {
  let { name, category } = req.body;
  if (!req.body.category) {
    req.body.category = req.params.category_id;
  }
  const new_Subcategory = await subcategory_db.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ Status: "Success", data: { new_Subcategory } });
});

const Update_subcategory = AsyncWrapper(async (req, res) => {
  const { name, category } = req.body;
  const Modify_subcategory = await subcategory_db.findByIdAndUpdate(
    { _id: req.params.subcategory_id },
    { $set: { name, slug: slugify(name), category } },
    { new: true }
  );
  res.status(200).json({ Status: "Success", data: { Modify_subcategory } });
});

const Delete_subcategory = AsyncWrapper(async (req, res) => {
  const subcategory_id = req.params.subcategory_id;
  if (!subcategory_id) {
    return res.json({ Status: "error", Message: "This Id Not Exist" });
  }
  await subcategory_db.findByIdAndDelete({ _id: subcategory_id });
  res.status(200).json({ Status: "Success", data: "null" });
});

module.exports = {
  Getall_subcategory,
  Get_subcategory,
  Create_subcategory,
  Update_subcategory,
  Delete_subcategory,
};
