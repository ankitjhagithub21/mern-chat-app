const mongoose = require('mongoose')

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected.")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb