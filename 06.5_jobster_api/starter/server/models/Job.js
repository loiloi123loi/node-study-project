
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        require: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'Please provide User']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)
