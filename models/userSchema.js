const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [100, "Must contain maximum 100 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already registered"],
        maxLength: [100, "Must contain less than 100 characters"],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);