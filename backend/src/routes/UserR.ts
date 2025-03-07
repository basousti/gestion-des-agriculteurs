//gets the respnse of the frontend (API of users connected)
const appU =require("express")
const corsU = require("cors")
const UserController = require("../controller/UserC")
const Urouter = appU.Router()
const authMiddleware = require("../utils/authMiddleware")
//we reuse cors here for double safe
Urouter.use(corsU())

//When someone sends data to /login, call the loginS function.
Urouter.get("/users", authMiddleware.authenticationToken ,UserController.getUsers)

module.exports = Urouter
