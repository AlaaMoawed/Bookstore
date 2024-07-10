require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DB_HOST);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.log("DB Error:" + err);
});

const bookRouter = require("./router/book_router");
app.use("/book", bookRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://127.0.0.1:${PORT}`)
);
