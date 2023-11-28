const express = require(`express`);
const router = express.Router();
const Category_controller = require(`../Controller/CategoryController`);
const SubcategoryRoute = require(`./SubcategoryRoute`);
router.use(`/:category_id/subcategory`, SubcategoryRoute);
router
  .route(`/`)
  .get(Category_controller.Getall_category)
  .post(Category_controller.Create_category);
router
  .route(`/:category_id`)
  .get(Category_controller.Get_category)
  .put(Category_controller.Update_category)
  .delete(Category_controller.Delete_category);

module.exports = router;
