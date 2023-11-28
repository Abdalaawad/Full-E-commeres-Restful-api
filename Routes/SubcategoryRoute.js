const express = require(`express`);
const router = express.Router({ mergeParams: true });
const Subcategory_controller = require(`../Controller/SubcategoryController`);

router
  .route(`/`)
  .get(Subcategory_controller.Getall_subcategory)
  .post(Subcategory_controller.Create_subcategory);
router
  .route(`/:subcategory_id`)
  .get(Subcategory_controller.Get_subcategory)
  .put(Subcategory_controller.Update_subcategory)
  .delete(Subcategory_controller.Delete_subcategory);

module.exports = router;
