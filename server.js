var express = require("express");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("upfile");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong");
    }
    const { originalname, type, size } = req.file;
    res.json({ name: originalname, type: type, size: size });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
