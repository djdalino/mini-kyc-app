const router = require("express").Router();
const Upload = require("../models/upload.model");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      Math.random()
        .toString(36)
        .substr(2, 9) +
        "-" +
        file.originalname
    );
  }
});
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  }
});

router.get("/", async (req, res) => {
  const uploads = await Upload.find();
  res.json(uploads);
});

router.post("/", uploadFile.single("upload"), async (req, res) => {
  const newUploads = new Upload({
    upload: req.file.path
  });
  try {
    const saveUpload = await newUploads.save();
    res.json(saveUpload);
  } catch (error) {
    res.status(400).send(err);
  }
});

module.exports = router;
