require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello witthawat 2003 World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
