import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const signupRoute= require("./routes/signupR");
const loginRoute = require("./routes/loginR");
const userRoute = require("./routes/UserR");
const bodyParser = require("body-parser");
const createAdminacc = require("./script/admin");
const ForgetPw = require("./ConfigPassword/Route")
 
// Middleware "use" permet de traiter le requeste it's like "Every time someone visits, do this first!"
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

createAdminacc();

app.use("/user", signupRoute);
app.use("/auth",loginRoute);
app.use("/api",userRoute);
app.use("/Verif",ForgetPw);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript with Express!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

