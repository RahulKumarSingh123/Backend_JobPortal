const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true,
        maxLength: 100,
    },
    jobLocation: {
        type: String,
        required: true,
        maxLength: 50,
    },
    salary: {
        type: String,
        required: true,
        maxLength: 50,
    },
    deadline: {
        type: Date,
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model('Jobs', jobSchema);