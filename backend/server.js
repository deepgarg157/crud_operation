const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
dotenv.config()

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// server is running
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'server is running'
    })
})

// routes
const userRoute = require('./routes/userRoute')
app.use('/user/v1/api', userRoute)

// mongodb connect
mongoose.connect('mongodb+srv://admin:admin123@cluster0.zeg1dyy.mongodb.net/crud')
    .then((res) => console.log('mongodb is connected'))
    .catch((error) => console.log(error.message))

const port = 4000 || process.env.port
app.listen(port, () => console.log(`server is running at ${port}`));