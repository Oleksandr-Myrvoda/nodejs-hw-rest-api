const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((error, _req, res, _next) => {
  const code = error.code || 500;
  const message = error.message || "Server error";
  res.status(code).json({ status: "fail", code, message });
});

// ======== Example ===============================================
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });

module.exports = app;
