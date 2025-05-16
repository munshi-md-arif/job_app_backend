const express = require("express");

const app = express();
const mongoose = require("mongoose");
const port = 3400;
const jobouter = require("./routes/job");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(process.env.MONGO_URL, "Connected to MongoDB");
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/jobs", jobouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`🚀 Server started: http://localhost:${port}`);
});
