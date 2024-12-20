const express = require('express');
const router= express.Router();
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const lectureRouter = require('./lecture');

router.use('/student',studentRouter);
router.use('/teacher',teacherRouter);
router.use('/lecture',lectureRouter);
module.exports=router;





