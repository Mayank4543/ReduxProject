const express = require("express");
const app = express();
app.use(express.json());
const errormidddleware = require("./middleware/error");
const product = require("./routes/productRoutes");

app.use(errormidddleware);
app.use("/api/v1", product);

module.exports = app;
