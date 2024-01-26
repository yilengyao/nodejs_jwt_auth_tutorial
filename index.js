require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
// const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');
// const mongoose = require('mongoose');
// const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 9001;

// Middlewares
app.use(express.json());

// Routes
app.use("/home", require("./routes/home"));

// connection
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
