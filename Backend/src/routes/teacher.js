const express=require('express');
const teacherRouter=express.Router();
const zod= require('zod');

const {User, Course}=require('../models');
const authorize = require('../middleware');

const courseSchema=zod.object({
    title:zod.string().nonempty(),
    description:zod.string().nonempty(),
    duration:zod.number().int(),
    
});


//teacher course creation route

teacherRouter.post('/course',authorize('teacher'), async(req,res)=>{
    const courseSuccess=courseSchema.parse(req.body);
    if(!courseSuccess){
        return res.status(400).json({error:"Invalid data"});
    }

    const teacherid=req.user.id;


    
try{
    const course= await Course.create({
        ...courseSuccess,
        teacher:teacherid
    });
    const teacher = await User.findByIdAndUpdate(
        teacherid,
        { $push: { courses: course._id } },
        { new: true } // Return the updated teacher document
      );
    res.status(201).json({course});}
    catch(err){
        res.status(400).json({error:err.message});
    }
    
})



//teacher course update route (add lecture,notes,etc)
//multer for file upload and create file link and save it to db under lecture section of course

teacherRouter.put('/course/:id',authorize('teacher'),async(req,res)=>{
    
})





module.exports=teacherRouter;