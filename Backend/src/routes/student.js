const express=require('express');
const studentRouter=express.Router();
const zod= require('zod');
const {User, Course}=require('../models')
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
const authorize = require('../middleware');
dotenv.config({ path: '.env' });

const userSchema=zod.object({
    name:zod.string().nonempty(),
    email:zod.string().email(),
    oauthId:zod.string(),
    role:zod.string()
});

//user add route

studentRouter.post('/add',async(req,res)=>{
    const userSuccess=userSchema.parse(req.body);
    if(!userSuccess){
        return res.status(400).json({error:"Invalid data"});
    }
    let user=await User.findOne({email:userSuccess.email});
    if(!user){
        user=await User.create(
        userSuccess
    );
    
    ;}
    
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
    res.status(201).json({auth:token});
})

//user course enrollment route

studentRouter.put('/enroll/:id',authorize('student'),async(req,res)=>{
    
    const courseId = req.params.id;
    const userId = req.user.id; // Extracted from token by middleware

    try {
      // Find the user and populate the enrolled courses
      const user = await User.findById(userId).populate('courses');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is already enrolled in the course
      const isEnrolled = user.courses.some((course) => course._id.equals(courseId));
  
      if (isEnrolled) {
        return res.status(400).json({ message: 'You are already enrolled in this course' });
      }
  
      // Add the course to the user's enrolled courses
      
        const updatedUser = await User.findByIdAndUpdate(userId,{ $push: { courses: courseId } },{ new: true });
      //add student to course
        const course = await Course.findByIdAndUpdate(courseId,
            { $push: { students: userId } },
            { new: true } // Return the updated course document
        )
  
      res.status(200).json({ message: 'Course enrolled successfully' });
    } catch (error) {
      console.error('Error enrolling course:', error);
      res.status(500).json({ message: 'Server error' });
    }
  })

//user  all course info get route

studentRouter.get('/courses',authorize('student') ,async(req,res)=>{
    
    const courses=await Course.find({}).populate('teacher')
    .select('-lectures -students'); 
    
    res.status(200).json({courses});


})



//user enrolled course 
studentRouter.get('/mycourse',authorize(['student','teacher']),async(req,res)=>{
    const userId = req.user.id; // Extracted from token by middleware

    try {
      // Find the user and populate the enrolled courses
      const user = await User.findById(userId).populate('courses');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Enrolled courses retrieved successfully',
        courses: user.courses, // Full course details
      });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      res.status(500).json({ message: 'Server error' });
    }
})



//user getcourse by id route

studentRouter.get('/course/:id',authorize('student'),async(req,res)=>{
    const courseId = req.params.id;
    const userId = req.user.id; // Extracted from token by middleware

    try {
      // Find the user and populate the enrolled courses
      const user = await User.findById(userId).populate('courses');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is enrolled in the course
      const isEnrolled = user.courses.some((course) => course._id.equals(courseId));
  
      if (!isEnrolled) {
        return res.status(403).json({ message: 'You are not enrolled in this course' });
      }
  
      // Find the course by ID
      const course = await Course.findById(courseId);

      res.status(200).json({ course });
    
    
    }
        catch(err){
            res.status(400).json({error:err.message});


}})





  module.exports=studentRouter;