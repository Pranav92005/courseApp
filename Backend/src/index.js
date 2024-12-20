const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
const router = require('./routes/main');    
const multer = require('multer');
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.listen(port, () => {console.log(`Server is running on port: ${port}`)});