const Job = require("../models/job");


module.exports = {
    createJob: async (req, res) => {
        try {
            const job = new Job(req.body);
            await job.save();
            res.status(201).json({ status: true, message: "Job created successfully", job: job });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateJob: async (req, res) => {
        const jobId = req.params.id;
        const updatedJob = req.body;
        try {
            const job = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });
            if (!job) {
                return res.status(404).json({ status: false, error: "Job not found" });
            }
            res.status(200).json({ status: true, message: "Job updated successfully", job: job });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteJob: async (req, res) => {
        const jobId = req.params.id;
        try {
            const job = await Job.findByIdAndDelete(jobId);
            if (!job) {
                return res.status(404).json({ status: false, error: "Job not found" });
            }
            res.status(200).json({ status: true, message: "Job deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}