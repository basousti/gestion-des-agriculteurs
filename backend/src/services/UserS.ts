//get users API
//this file read users fro db
const user = require("../models/users");

async function getUsers() {
    return await user.find({});  // ✅ The function correctly returns a Promise
}

module.exports = { getUsers };
