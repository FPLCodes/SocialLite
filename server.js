const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserProfileRoutes = require("./routes/api/userProfiles");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.use("/api/userProfiles", UserProfileRoutes);
app.get("/", (req, res) => res.send("Working"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
