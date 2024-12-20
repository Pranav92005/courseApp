const express = require('express');
const lectureRouter = express.Router();
const { Lecture } = require('../models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Files will be saved in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicate filenames
    },
  });
  const upload = multer({ storage: storage });


lectureRouter.post('/add', async (req, res) => {
    const {title, content, date} = req.body;
    const lecture = await Lecture.create({
        title,
        content,
        date
    });
    res.status(201).json({ lecture });
})

lectureRouter.get('/getAll', async (req, res) => {
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

// lectureRouter.patch('/update/:id', async (req, res) => {
//     const id = req.params.id;
//     var file = null;
    
//     const lecture = await Lecture.findByIdAndUpdate(id, {
        
//     });
//     res.status(200).json({ lecture });
// })  

lectureRouter.post('/upload', upload.single('file'), async (req, res) => {
    var file = null;
    try{
        file = req.file;
       
        lectureRouter.patch('/update/:id', async (req, res) => {
            const id = req.params.id;
            const lecture = await Lecture.findByIdAndUpdate(id, {
                materials: [...materials, file.path]
            });
            res.status(200).json({ lecture });
        })
    }
    catch(err){
        console.log(err);
    }
})

module.exports = lectureRouter;