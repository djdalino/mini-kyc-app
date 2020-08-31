const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use("/client/uploads", express.static("./client/uploads"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//routes
const upload = require("./routes/upload.routes");
app.use("/api/upload", upload);

const mongoURI =
  "mongodb+srv://djdalino:TpW5Z6aYjCENviOt@cluster3-hngry.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
  mongoURI || process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) return console.error(err);
    console.log("connected to the database!");
  }
);

const root = require("path").join(__dirname, "/../client/build");

app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
