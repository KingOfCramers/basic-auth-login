const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 8081;

const userRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/bots", { useNewUrlParser: true })
    .then(() => console.log("connected to mongodb"))
    .catch((err) => { 
        console.log(err);
    });

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


// Routes
app.use("/auth", userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});