const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODBSTRING) {
        console.warn('MONGODBSTRING is not defined — skipping database connection.');
        return;
    }

    try{
        console.log("Attempting database connection")
        await mongoose.connect(process.env.MONGODBSTRING);

        console.log("Database Connected Successfully!")

    }catch(error){
        console.error("database connection failed", error);
        // Don't exit the process here to allow development/test environments to continue running.
    }
    
}


module.exports = connectDB;