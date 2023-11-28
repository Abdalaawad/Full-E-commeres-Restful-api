const express = require(`express`);
const router = express.Router();
const Product_controller = require(`../Controller/ProductController`);
const VerifyToken = require(`../Middleware/VerifyToken`);
const ToAllow = require(`../Middleware/ToAllow`);
router
  .route(`/`)
  .get(VerifyToken, Product_controller.Getall_Product)
  .post(Product_controller.Create_Product);
router
  .route(`/:product_id`)
  .get(Product_controller.Get_Product)
  .put(Product_controller.Update_Product)
  .delete(
    VerifyToken,
    ToAllow("admin", "manager"),
    Product_controller.Delete_Product
  );

module.exports = router;
