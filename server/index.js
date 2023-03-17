require("dotenv").config();
require('express-async-errors')

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorHandler = require('./middleware/errorHandler')
const {logger, logEvents} = require("./middleware/logger");
const corsConfig = require("./config/corsConfig");
const connectDb = require("./config/dbConnect");

const app = express();
const PORT = process.env.PORT || 3002;

connectDb();

app.use(logger);

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsConfig));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/list', require('./routes/listsRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'html', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    }
})

app.use(errorHandler)

mongoose.connection.once("open", () => {
    console.log("Connection to MongoDB success");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})