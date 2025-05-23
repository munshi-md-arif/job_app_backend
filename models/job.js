const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,

    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    agentName: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    contract: {
        type: String,
        required: true,
    },
    hiring: {
        type: Boolean,
        required: true,
        default: true
    },
    requirements: {
        type: Array,
        required: true,
        default: []
    },
    imageUrl: {
        type: String,
        required: true,
    },
    agentId: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Job", jobSchema);