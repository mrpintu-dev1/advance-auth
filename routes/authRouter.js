// external imports
import express from "express";

// internal import 
import { forgotPassword, login, register, resetPassword } from './../controllers/authController.js';

// initialize router
const router = express.Router();

// User register post Request
router.route('/register').post(register);
// User login
router.route('/login').post(login);
// Forgot Password
router.route('/forgot-password').post(forgotPassword);
// Reset password
router.route('/reset-password/:resetToken').put(resetPassword);


export default router;