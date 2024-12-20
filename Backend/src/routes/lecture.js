const express = require('express');
const lectureRouter = express.Router();
const { Lecture } = require('../models');

lectureRouter.post('/add/:id', async (req, res) => {
    const {title, content, date} = req.body;
    const lecture = await Lecture.create({
        title,
        content,
        date
    });
    res.status(201).json({ lecture });
})

lectureRouter.get('/getAll/:id', async (req, res) => {
    const lectures = await Lecture.find();
    res.status(200).json({ lectures });
})

lectureRouter.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    const lecture = await Lecture.findById(id);

    if(lecture)
        res.status(200).json({ lecture });  
    else
        res.status(404).json({ message: 'Lecture not found' });
})

module.exports = lectureRouter;