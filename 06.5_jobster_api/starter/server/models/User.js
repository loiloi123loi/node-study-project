
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Please provide password'],
        minlength: 6
    },
    lastName: {
        type: String,
        default: 'lastName',
        minlength: 3,
    },
    location: {
        type: String,
        default: 'city',
        minlength: 3,
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (passCompare) {
    const istrue = await bcrypt.compare(passCompare, this.password)
    return istrue
}

module.exports = mongoose.model('User', UserSchema)
