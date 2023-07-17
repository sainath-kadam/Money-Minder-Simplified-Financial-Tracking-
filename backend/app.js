const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
var fs = require('fs');
require('dotenv').config()

const app = express()


const PORT = process.env.PORT
const diary = require('./routes/transactions');

connectDB();
app.use(express.json())
app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/routes/', diary);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

