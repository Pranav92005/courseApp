const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const router = require('./routes/main');    

app.use(express.json());
app.use(cors());
app.use('/api', router);
















app.listen(port, () => {console.log(`Server is running on port: ${port}`)});