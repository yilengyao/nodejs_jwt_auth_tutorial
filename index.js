require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents'); // crashed vercel function
// const errorHandler = require('./middleware/errorHandler'); // crashed vercel functions
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 9001;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Middlewares
app.use(express.json());

// Routes
app.use("/home", require("./routes/home"));

// connection
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
