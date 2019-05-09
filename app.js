const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
app.use("/users", userRoutes);

// Start server

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});