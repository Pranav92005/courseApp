const express = require('express');
const lectureRouter = express.Router();
const { Lecture, Course } = require('../models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Save to "uploads" folder
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique name
  });
  const upload = multer({ storage });


  //schedule lecture route
lectureRouter.post('/add/:id', async (req, res) => {
    const {title, date} = req.body;
     const courseId= req.params.id;
  const lecture = await Lecture.create({
        title,
        date
    });
    const course=await Course.findByIdAndUpdate(courseId, {
        $push: {lectures: lecture._id}
    })

    res.status(201).json({ lecture });
})


lectureRouter.post('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ message: "Material is required" });
        }

        const material = `http://localhost:3000/uploads/${file.filename}`;
        const id = req.params.id;

        // Find the lecture to retrieve existing materials
        const lecture = await Lecture.findById(id);

        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        // Add the new material to the existing materials array
        const updatedLecture = await Lecture.findByIdAndUpdate(
            id,
            { materials: [...(lecture.materials || []), material] },
            { new: true }
        );

        res.status(200).json({
            message: "Material uploaded successfully",
            lecture: updatedLecture,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = lectureRouter;