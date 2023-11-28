const express = require(`express`);
const router = express.Router();
const User_controller = require(`../Controller/UserController`);

router
  .route(`/`)
  .get(User_controller.Get_allUser)
  .post(User_controller.Create_User);
router
  .route(`/:user_id`)
  .get(User_controller.Get_User)
  .put(User_controller.Update_User)
  .delete(User_controller.Delete_User);

module.exports = router;
