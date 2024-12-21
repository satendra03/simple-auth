// Description: This file is the entry point of the application. It sets up the express server and the routes.
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";

import { connectToDB } from "./connection.js";
import { restrictUser } from "./middlewares/auth.js";

const app = express();

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to DB  
connectToDB("mongodb://localhost:27017/users");

app.use("/", indexRouter);
app.use("/users", restrictUser, userRouter);

app.listen(3000, () => {
  console.clear();
  console.log("Server is running on port 3000");
});
