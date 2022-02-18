// internal imports
import { User } from './../models/User.js';

// User registration controller
export const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        })
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

// User login
export const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            error: 'Please provide email and password'
        })
    }
    try {
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            res.status(404).json({
                success: false,
                error: 'Invalid credentials.'
            })
        }
        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            res.status(404).json({
                success: false,
                error: 'Invalid credentials.'
            })
        }
        res.status(200).json({
            success: true,
            token: 'sgjauojawga'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const forgotPassword = (req, res) => {
    res.send('Forgot Password');
};

export const resetPassword = (req, res) => {
    res.send('Reset password');
};