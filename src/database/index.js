const mongoose = require("mongoose");

const { DB_HOST, DB_NAME } = require("../../config/config");
const UserModel = require("./models/user");

const makeUserDb = require("./user-db");
const UserDb = makeUserDb({ UserModel })

module.exports = (() => {
    // Check if connected
    let connection = null;

    if(!connection){
        // Connect to mongodb server and return the instance in connection variable
       connection = mongoose.connect(`${DB_HOST}/${DB_NAME}`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }

    // Return an access-data object.
    return Object.freeze({
        models: {
            UserModel
        },
        UserDb
    })
})();