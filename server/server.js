const express = require('express');
require('dotenv').config();
const cors = require('cors');

require('./config/mongo');
const userRouter = require('./routes/userRoute');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.get('/', (req, res) => (
    res.json({
        success: true,
        message: 'Welcome to the user-management server'
    })
));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
