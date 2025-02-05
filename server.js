const express = require("express");
const app = express();
const questions = require("./questions.json");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cors({
    origin: "http://127.0.0.1:5500",
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello, welcome to the quiz API!");
});

app.get("/questions", (req, res) => {
    res.json(questions);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

module.exports = app;