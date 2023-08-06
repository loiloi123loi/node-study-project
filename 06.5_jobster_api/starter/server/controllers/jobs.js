const mongoose = require("mongoose");
const { NotFoundError, UnAuthenticatedError } = require("../errors");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJob = async (req, res) => {
    const { status, jobType, sort, search } = req.query;
    const objectQuery = { createdBy: req.user.id };
    if (search) {
        objectQuery.position = { $regex: search, $options: "i" };
    }
    if (jobType && jobType !== "all") {
        objectQuery.jobType = jobType;
    }
    if (status && status !== "all") {
        objectQuery.status = status;
    }
    let result = Job.find(objectQuery);

    if (sort === "lastest") {
        result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    if (sort === "a-z") {
        result = result.sort("position");
    }
    if (sort === "z-a") {
        result = result.sort("-position");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skipPage = (page - 1) * limit;
    result = result.skip(skipPage).limit(limit);

    const jobs = await result;
    const totalJobs = await Job.countDocuments(objectQuery);
    const numOfPages = Math.ceil(totalJobs / limit);
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOne({
        _id: id,
        createdBy: req.user.id,
    });
    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new UnAuthenticatedError("Test user is read only");
    }
    req.body.createdBy = req.user.id;
    console.log(req.body);
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({ msg: "OK" });
};

const updateJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new UnAuthenticatedError("Test user is read only");
    }
    const {
        body: { company, position },
        params: { id: jobId },
        user: { id: userId },
    } = req;
    if (company === "" || position === "") {
        throw new BadRequestError("Company or Position fields cannot be empty");
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new UnAuthenticatedError("Test user is read only");
    }
    const job = await Job.findByIdAndRemove({
        _id: req.params.id,
        createdBy: req.user.id,
    });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({});
};

const getAllStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
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

    const monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id:month": -1 } },
        { $limit: 12 },
    ]);
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
    getAllJob,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
    getAllStats,
};
