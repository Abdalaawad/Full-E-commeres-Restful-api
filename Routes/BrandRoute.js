const express = require(`express`);
const router = express.Router();
const Brand_controller = require(`../Controller/BrandController`);
router
  .route(`/`)
  .get(Brand_controller.Getall_Brand)
  .post(Brand_controller.Create_Brand);
router
  .route(`/:brand_id`)
  .get(Brand_controller.Get_Brand)
  .put(Brand_controller.Update_Brand)
  .delete(Brand_controller.Delete_Brand);

module.exports = router;
