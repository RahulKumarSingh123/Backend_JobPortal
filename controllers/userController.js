const bcrypt = require("bcrypt");
const user = require("../models/userSchema");
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const registerController = async(req, res) => {
    try {
        const { name, email, password, role } = await req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || "user",
        })
        if (newUser) {
            console.log(newUser);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: newUser,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "User not registered"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to Register",
        })
    }
}


const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
        const getUser = await user.findOne({ email: email });
        if (getUser) {
            const isMatched = await bcrypt.compare(password, getUser.password);
            if (isMatched) {
                const token = jwt.sign({ email: email, name: getUser.name, role: getUser.role }, process.env.SECRET_KEY, { expiresIn: "15m" });
                res.status(200).json({
                    success: true,
                    message: "User Logged in successfully",
                    accessToken: token,
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid Password",
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: "User does not exists, Register User",
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong,Try again!"
        })
    }
}

const changePasswordController = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const { oldPassword, newPassword } = req.body;
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            res.status(400).json({
                success: false,
                message: "Invalid Old password",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).json({
            success: true,
            message: "Password Updated successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

module.exports = { registerController, loginController, changePasswordController };