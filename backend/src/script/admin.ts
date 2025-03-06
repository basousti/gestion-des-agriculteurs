const admin = require('../models/users')
const cryptPW = require('bcrypt')


async function createAdmin() {

    try {
        const existingAdmin = await admin.findOne({email:"badisoumayma018@gmail.com"});
        if(!existingAdmin)
            {
            const createAdmin = new admin({
                name :'Oumayma', 
                email:'badisoumayma018@gmail.com', 
                password: await cryptPW.hash("7#oum@ym@53%", 10),
                role :"admin" });
            await createAdmin.save();
            console.log("new admin created suceccfully")}
        else{
            console.log("Admin already exists")
        }

    } catch (error:any) {
        console.log("error on creating admin",error.message)
    }
}

module.exports = createAdmin; 