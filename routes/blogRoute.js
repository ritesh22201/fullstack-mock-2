const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/authMiddleware');
const BlogModel = require('../models/blogModel');
const blogRouter = express.Router();

blogRouter.get('/blogs', auth, async (req, res) => {
    const { title, category, sort, order } = req.query;

    try {
        if (title) {
            const blogs = await BlogModel.find({ title: { $regex: title, $options: 'i' } });
            res.status(200).send(blogs)
        }
        else if (category) {
            const blogs = await BlogModel.find({ category });
            res.status(200).send(blogs)
        }
        else if (sort) {
            const sortField = sort;
            let sortOrder = 1;

            if (order === 'desc') {
                sortOrder = -1;
            }

            const blogs = await BlogModel.find().sort({ [sortField]: sortOrder });
            res.status(200).send(blogs)
        }
        else {
            const blogs = await BlogModel.find();
            res.status(200).send(blogs)
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

blogRouter.post('/blogs', auth, async(req, res) => {
    try {
        const blog = await BlogModel.create(req.body);
        res.status(200).send({msg : 'Blog posted successfully', blog});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = blogRouter;