const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/api", require("./api"));

mongoose.connect("mongodb://localhost/userdb", {useNewUrlParser:true});

app.listen(3000, ()=> {
    console.log("Server ok");
})
