const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: false })); // to parse urlencoded data (form data)


app.use("/", staticRouter);

app.use("/url", urlRoute);



app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
