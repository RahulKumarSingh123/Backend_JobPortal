const mongoose = require('mongoose');

const db_connection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = db_connection;