import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username."],
    },
    email: {
        type: String,
        required: [true, "Please provide a email."],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email.'
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password."],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date
});


// Hashing users password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// compare password
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// json web token
userSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};

// Reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpired = Date.now() + 10 * ( 60 * 1000 ); 

    return resetToken;
};

export const User = mongoose.model('User', userSchema);