
const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const moment = require('moment')
const Job = require('../models/Job')

const getAllStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = moment()
                .month(month - 1)
                .year(year)
                .format('MMM Y');
            return { date, count };
        })
        .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}

const getAllJobs = async (req, res) => {
    const { search, status, jobType, sort } = req.query
    console.log('query: ', req.query)
    const objectQuery = {
        createdBy: req.user.id
    }
    if (search) {
        objectQuery.position = { $regex: search, $options: 'i' }
    }
    if (status && status !== 'all') {
        objectQuery.status = status
    }
    if (jobType && jobType !== 'all') {
        objectQuery.jobType = jobType
    }
    let result = Job.find(objectQuery)
    // sort
    if (sort === 'lastest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('-position')
    }
    if (sort === 'z-a') {
        result = result.sort('position')
    }
    // page, limit
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const countSkip = (page - 1) * limit
    result = result.skip(countSkip).limit(limit)
    const jobs = await result
    const totalJobs = await Job.countDocuments(objectQuery)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const getSingleJob = async (req, res) => {
    const {
        user: { id },
        params: { id: jobId }
    } = req
    const job = await Job.findOne({
        _id: jobId,
        createdBy: id
    })
    if (!job) {
        throw new NotFoundError(`No job id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    const { position, company, jobLocation, jobType, status } = req.body
    const job = await Job.create({
        position,
        company,
        jobLocation,
        jobType,
        status,
        createdBy: req.user.id
    })
    res.status(StatusCodes.CREATED).json({ msg: 'Created Job' })
}

const updateJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById({ _id: id })
    if (!job) {
        throw new BadRequestError('Please provide true value')
    }
    const { position, company, jobLocation, jobType, status } = req.body
    if (!position || !company || !jobLocation || !jobType || !status) {
        throw new BadRequestError('Please provide all fields')
    }
    job.position = position
    job.company = company
    job.jobLocation = jobLocation
    job.jobType = jobType
    job.status = status
    await job.save()
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findByIdAndRemove({
        _id: id,
        createdBy: req.user.id,
    });
    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'OK' })
}

module.exports = {
    getAllStats,
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}
