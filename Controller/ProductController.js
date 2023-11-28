const product_db = require(`../Model/ProductModel`);
// const slugify = require(`slugify`);
const AsyncWrapper = require(`../Middleware/Asyncwrapper`);
const ErrorHandler = require(`../Util/ErrorHandler`);
const ApiFeature = require(`../Util/ApiFeature`);

const Getall_Product = AsyncWrapper(async (req, res) => {
  let mongoose = new ApiFeature(product_db.find({}), req.query)
    .Pagination()
    .Sort()
    .Filter()
    .Field()
    .Search("product");

  const All_product = await mongoose.mongooseQuery;
  res.status(200).json({
    Status: "Success",
    length: All_product.length,
    page: mongoose.page,
    data: { All_product },
  });
});

const Get_Product = AsyncWrapper(async (req, res, next) => {
  const product_id = req.params.product_id;
  const product = await product_db.findById(product_id);
  if (!product) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  res.status(200).json({ Status: "Success", data: { product } });
});

const Create_Product = AsyncWrapper(async (req, res) => {
  // const { name } = req.body;

  const new_product = await product_db.create(req.body);
  console.log(new_product);
  res.status(201).json({ Status: "Success", data: { new_product } });
});

const Update_Product = AsyncWrapper(async (req, res) => {
  const { name } = req.body;
  const Modify_product = await product_db.findByIdAndUpdate(
    { _id: req.params.product_id },
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ Status: "Success", data: { Modify_product } });
});

const Delete_Product = AsyncWrapper(async (req, res) => {
  const product_id = req.params.product_id;
  if (!product_id) {
    const Error = new ErrorHandler("This ID Don`t Exist ", 404, "Error");
    return next(Error);
  }
  await product_db.findByIdAndDelete({ _id: product_id });
  res.status(200).json({ Status: "Success", data: "null" });
});

module.exports = {
  Getall_Product,
  Get_Product,
  Create_Product,
  Update_Product,
  Delete_Product,
};
