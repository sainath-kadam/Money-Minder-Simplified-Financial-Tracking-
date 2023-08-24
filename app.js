const express = require('express')
const cors = require('cors');
var fs = require('fs');
require("./db/conn");
require('dotenv').config()
const app = express()
const diary = require('./routes/transactions');
app.use(express.json())
app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/routes/', diary);
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
