const express = require('express');
require('dotenv').config();

const app = express();

const PORT = 5000 || process.env.PORT 

const connectDB = require('./src/config/db');

connectDB();

app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}/`))