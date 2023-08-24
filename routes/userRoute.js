const express = require('express');
const validator = require('../middlewares/validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const BlackListModel = require('../models/blacklistModel');
const userRouter = express.Router();

userRouter.post('/register', validator, async (req, res) => {
    const { password } = req.body;
    try {
        const newPass = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ ...req.body, password: newPass });
        res.status(200).send({ msg: 'User registered successfully', user });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ msg: 'User not found, please signup!' });
        }
        else {
            const comparedPass = await bcrypt.compare(password, user.password);
            if (!comparedPass) {
                res.status(400).send({ msg: 'Wrong password!' })
            }
            else {
                const token = jwt.sign({ userId: user._id, name: user.username }, process.env.secretKey, { expiresIn: '1d' });
                res.status(400).send({ msg: 'User logged in successfully', token, username: user.username });
            }
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.get('/logout', validator, async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            res.status(400).send({ msg: 'Login first!' });
        }
        else{
            const blacklist = await BlackListModel.create({token});
            res.status(200).send({ msg: 'User logged out successfully' });
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports = userRouter;