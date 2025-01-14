const mongoose = require('mongoose');

const connectdb = (con) => {
    return mongoose.connect(con, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Database error:", err);
    });
};

module.exports = connectdb;
