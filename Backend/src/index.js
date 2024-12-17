const express = require('express');
const app = express();
const port = 3000;
import router from './routes/main';

app.use(express.json());
app.use(cors());
app.use('/api', router);













app.listen(port, () => {`Server is running on port: ${port}`});