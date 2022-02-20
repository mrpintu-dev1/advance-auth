import crypto from "crypto";
// internal imports
import { User } from './../models/User.js';
import { ErrorResponse } from './../utils/errorResponse.js';
import { sendEmail } from './../utils/sendEmail.js';

// User registration controller
export const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        })
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// User login
export const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }
    try {
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(
                new ErrorResponse("Invalid credentials", 401)
            );
        }
        sendToken(user, 200, res);
    } catch (error) {
        return next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off >${resetUrl}</a>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message,
            });

            res.status(200).json({
                success: true,
                data: "Email sent",
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpired = undefined;

            await user.save();
            return next(new ErrorResponse("Email could not be send.", 500));
        }
    } catch (error) {
        return next(error);
    }
};

export const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpired: { $gt: Date.now()}
        })

        if (!user) {
            return next(new ErrorResponse('Invalid reset token', 400));
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password reset success'
        })
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    })
}