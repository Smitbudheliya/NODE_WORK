const express=require("express");
const { loginPage, loginUser , logoutUser, forgotPassword, sendEmailWithOtp, verifyOtp, resetPassword , resetPasswordPage,changePassword} = require("../controllers/authCtr");
const { body } = require("express-validator");
const routes=express.Router();


routes.get('/',loginPage)
routes.use('/admin',require('./admin_Routes'))
// validation ke lia
routes.post('/login', [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginUser);

routes.get('/logout',logoutUser)
routes.get('/forgotPassword',forgotPassword)
routes.post('/send-email',sendEmailWithOtp)
routes.post('/verify-otp',verifyOtp)
routes.get('/verify-otp',verifyOtp)
routes.post('/reset-password',resetPassword)
routes.get('/resetPassword',resetPasswordPage)
routes.get('/change-password',changePassword)
module.exports=routes;