const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})