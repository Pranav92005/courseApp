import express from 'express';
const router= express.Router();
import studentRouter from './users';
import teacherRouter from './product';

router.use('/student',studentRouter);
router.use('/teacher',teacherRouter);

export default router;





