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
    },
    getJob: async (req, res) => {
        const jobId = req.params.id;
        try {
            const job = await Job.findById(jobId, { createdAt: 0, updatedAt: 0, __v: 0 });
            if (!job) {
                return res.status(404).json({ status: false, error: "Job not found" });
            }
            res.status(200).json({ status: true, message: "Job found successfully", job: job });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    getAllJobs: async (req, res) => {
        const recent = req.query.new;
        try {
            let jobs;
            if (recent) {
                jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(5);
            } else {
                jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
            }
            // let jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(5);
            res.status(200).json({ status: true, message: "Jobs found successfully", jobs: jobs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    searchJobs: async (req, res) => {
        try {
            const jobs = await Job.aggregate([
                {
                    $search: {
                        index: "jobsearch",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])


            res.status(200).json({ status: true, message: "Jobs found successfully", jobs: jobs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}