require('dotenv').config();
const express = require("express");
const { MongoConnect } = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routers/url");
const staticRouter = require("./routers/staticRouter");
const userRouter = require("./routers/user");
const { checkForAuthentication} = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8000;

// connect mongo
MongoConnect(process.env.MONGO_URL)
.then(()=>console.log("Mongo Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// view Engine
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// routes  
app.use("/url",checkForAuthentication,urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT,()=>console.log(`server Started at: ${PORT}`));
