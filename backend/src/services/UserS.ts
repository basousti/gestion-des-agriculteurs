//get users API
//this file read users fro db
const user = require("../models/users")

async function getUsers() {
    const users = await user.find({})
    return users
}

module.exports= {getUsers}