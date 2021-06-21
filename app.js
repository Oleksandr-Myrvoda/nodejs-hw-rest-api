const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./api");

const app = express();

app.use(cors());
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/v1/contacts", routes.contacts);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((error, req, res, next) => {
  const { code = 500, message = "Server error" } = error;
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const port = PORT || 3000;
    app.listen(port);
    console.log("Database connection successful");
  })
  .catch(({ message }) => {
    console.log(`Connection error: ${message}`), process.exit(1);
  });
