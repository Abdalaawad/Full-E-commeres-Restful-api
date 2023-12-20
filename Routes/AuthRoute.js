const express = require(`express`);
const router = express.Router();
const AuthController = require(`../Controller/AuthController`);

router.post(`/Api/v1/user/signup`, AuthController.Signup);
router.post(`/Api/v1/user/login`, AuthController.Login);
router.post(`/Api/v1/user/forgetpassword`, AuthController.ForgetPassword);
router.patch(`/Api/v1/user/resetpassword/:token`, AuthController.ResetPassword);

module.exports = router;
