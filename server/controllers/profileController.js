const User = require('../model/userModel')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
var mongoose = require('mongoose');


// get user profile
const getProfile = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id).select('-password').select('-verificationCode')
        res.json(user)
    } catch (err) {
        res.json({
            msg: "Something went wrong"
        })
    }
}

// update user phone
const updatePhone = async (req, res) => {
    try {
        const { id } = req.user
        const { phone } = req.body
        console.log(phone)
        if (!phone) {
            return res.json({
                msg: 'please provide a phone number'
            })
        }

        const user = await User.findById(id)
        user.phone = phone;
        await user.save();
        res.status(201).json({
            msg: 'Phone updated'
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong"
        })
    }
}
// update user roll number
const updateRollnumber = async (req, res) => {
    
    try {
        const { id } = req.user
        const { rollno } = req.body 
        if (!rollno) {
            return res.json({
                msg: 'please provide a roll number'
            })
        }

        const user = await User.findById(id)
        user.rollNumber = rollno;
        await user.save();
        res.status(201).json({
            msg: 'Roll no updateds'
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong"
        })
    }
}

const updateStream = async (req, res) => {
    
    try {
        const { id } = req.user
        const { stream } = req.body 
        console.log(stream,"stream")
        if (!stream) {
            return res.json({
                msg: 'please enter your Stream'
            })
        }

        const user = await User.findById(id)
        user.stream = stream;
        await user.save();
        res.status(201).json({
            msg: 'stream updated'
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong"
        })
    }
}

// update user image
const updateProfileImage = async (req, res) => {
    // upload photos to cloudinary
    console.log(req)
    const { title } = req.body
    console.log("runs 2" , title)
    console.log(req.files)
    const uploader = async (path) => await cloudinary.uploads(path, 'images');
    console.log("in here")
    console.log(req.body)
    try {
        const urls = []
        const files = req.files;
        // console.log(req)
        if (!files) {
            return res.json({
                msg: "Please provide images"
            })
        }
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }

        const user = await User.findById(id)
        user.userImg = urls;
        await user.save();
        res.status(201).json({
            msg: 'Roll no updateds'
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            msg: "Something went wrong"
        })
    }
}


// update user profile



module.exports = { getProfile, updatePhone, updateRollnumber, updateProfileImage, updateStream }