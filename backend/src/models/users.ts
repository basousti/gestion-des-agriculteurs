const mongoose = require ("../configuration/dbconfig")
//const userSchema = new mongoose.Schema({}, { strict: false });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    matriculate: String,
    password:String,
    role:{ type: String, enum:["admin","employer"], default:"employer"}
});

//I’ll create a model called user. This model will allow us to create, read, update, and delete users in the database 
//allows the program to interact with the user data in the database.user t7ot fih les données de userSchema
module.exports = mongoose.model("user", userSchema);
