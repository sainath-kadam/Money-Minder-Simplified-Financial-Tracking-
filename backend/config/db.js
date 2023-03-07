// const mongoose = require('mongoose');

// const db = async () => {
//     try {
//         mongoose.set('strictQuery', false)
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log('Db Connected')
//     } catch (error) {
//         console.log('DB Connection Error');
//     }
// }

// module.exports = {db}


const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;