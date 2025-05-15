const express = require("express");
const app = express();
const mongose = require("mongoose");
const port = 5000;

const dotenv = require("dotenv");
dotenv.config();
mongose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
    console.log(`The server is listening on port ${port}`);
});