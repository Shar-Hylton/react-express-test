const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        console.log("Attempting database connection")
        await mongoose.connect(process.env.MONGODBSTRING);

        console.log("Database Connected Successfully!")

    }catch(error){
        console.log("database connection failed", error);
        process.exit(1);
    }
    
}


module.exports = connectDB;