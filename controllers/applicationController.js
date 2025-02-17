const Application = require("../models/applicationSchema");
const User = require("../models/userSchema");
const Job = require("../models/jobSchema");
const upload = require("../helpers/upload-file");
const fs = require("fs");

const applicationController = async(req, res) => {
    try {
        const appliedJob = await req.params.id;

        //check if file is missing
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: 'File not found,Upload again'
            })
        }

        //Upload to cloudinary
        const { secure_url, public_id } = await upload(req.file.path);
        const user = await User.findOne({ email: req.user.email });
        //Adding application to database
        const appliedApplication = await Application.create({
            resume_url: secure_url,
            resume_public_id: public_id,
            applicant: user._id,
            appliedJob: appliedJob,
        })

        //deleting from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: "Job Applied successfully",
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const deleteApplicationController = async(req, res) => {

}

const getApplicationsController = async(req, res) => {
    try {
        const jobId = await req.params.id;
        const user = await User.findOne({ email: req.user.email });
        const job = await Job.findById(jobId);
        console.log(job.createdBy, user._id);
        if (job.createdBy.toString() != user._id.toString()) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to check because you have not created this job",
            });
        }

        //Implementing pagination 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'resume_url';
        const sortOrder = req.query.sortOrder == 'asc' ? 1 : -1;

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const applications = await Application.find({ appliedJob: jobId }).sort(sortObj).skip(skip).limit(limit);

        const totalApplications = await Application.countDocuments({ appliedJob: jobId });
        const totalPages = Math.ceil(totalApplications / limit);



        res.status(200).json({
            success: true,
            totalPages: totalPages,
            currentPage: page,
            totalApplications: totalApplications,
            message: "Data fetched successfully",
            data: applications
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}
module.exports = { applicationController, getApplicationsController };