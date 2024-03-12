const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/routes/route");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://testmemail777:cnCgdAf4nGhyiyKI@cluster0.pd0bjo3.mongodb.net/mini_peerfives",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.all("*", function (req, res) {
  throw new Error("Bad Request");
});

app.use(function (e, req, res, next) {
  if (e.message == "Bad Request")
    return res.status(400).send({ error: e.message });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
