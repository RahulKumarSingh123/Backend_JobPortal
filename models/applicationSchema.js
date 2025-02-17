const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    resume_url: {
        type: String,
        required: true,
    },
    resume_public_id: {
        type: String,
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    appliedJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
    },
    isSelected: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Applications', applicationSchema);