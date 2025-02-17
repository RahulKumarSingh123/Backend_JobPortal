const Jobs = require("../models/jobSchema");
const User = require("../models/userSchema");
const jobController = async(req, res) => {
    try {
        const jobPoster = await User.findOne({ email: req.user.email, role: req.user.role });
        const { name, location, salary, deadline } = await req.body;
        const createdJob = await Jobs.create({
            jobName: name,
            jobLocation: location,
            salary: salary,
            deadline: deadline,
            createdBy: jobPoster._id,
        });
        if (createdJob) {
            res.status(201).json({
                success: true,
                message: "Job Created successfuly",
                data: createdJob,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Job not created",
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

module.exports = jobController;