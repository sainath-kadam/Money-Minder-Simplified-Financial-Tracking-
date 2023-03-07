const express = require('express')
const cors = require('cors');
// const { db } = require('./db/db');
const connectDB = require('./config/db');
var fs = require('fs');



require('dotenv').config()

const app = express()


const PORT = process.env.PORT
const diary = require('./routes/transactions');

connectDB();
//middlewares
app.use(express.json())
app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));





app.use('/routes/transactions', diary);
// fs.readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

//routes
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


// const server = () => {
//     db()
//     app.listen(PORT, () => {
//         console.log('listening to port:', PORT)
//     })
// }

// server()