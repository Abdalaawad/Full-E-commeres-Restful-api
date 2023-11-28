const brand_db = require(`../Model/BrandModel`);
const slugify = require(`slugify`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);
const ErrorHandler = require(`../Util/ErrorHandler`);

const Getall_Brand = AsyncWrapper(async (req, res) => {
  // pagination
  const limit = req.query.limit * 1 || 20;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  // query

  const All_brand = await brand_db
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    Status: "Success",
    length: All_brand.length,
    page: page,
    data: { All_brand },
  });
});

const Get_Brand = AsyncWrapper(async (req, res, next) => {
  const brand_id = req.params.brand_id;
  const brand = await brand_db.findById(brand_id);
  if (!brand) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  res.status(200).json({ Status: "Success", data: { brand } });
});

const Create_Brand = AsyncWrapper(async (req, res) => {
  const { name } = req.body;

  const new_brand = await brand_db.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ Status: "Success", data: { new_brand } });
});

const Update_Brand = AsyncWrapper(async (req, res) => {
  const { name } = req.body;
  const Modify_brand = await brand_db.findByIdAndUpdate(
    { _id: req.params.brand_id },
    { $set: { name, slug: slugify(name) } },
    { new: true }
  );
  res.status(200).json({ Status: "Success", data: { Modify_brand } });
});

const Delete_Brand = AsyncWrapper(async (req, res) => {
  const brand_id = req.params.brand_id;
  if (!req.params.brand_id) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  await brand_db.findByIdAndDelete({ _id: brand_id });
  res.status(200).json({ Status: "Success", data: "null" });
});

module.exports = {
  Getall_Brand,
  Get_Brand,
  Create_Brand,
  Update_Brand,
  Delete_Brand,
};
