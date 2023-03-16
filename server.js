const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
// const path = require("path");

const routes = require("./routes/userRoute");

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // to allow send credentials:
    credentials: true,
  })
);

mongoose.connect(process.env.DB);

const port = process.env.PORT || 3001;

app.use("/", routes);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
