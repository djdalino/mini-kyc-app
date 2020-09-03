const router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserInput = require("../models/userInput.model");
router.get("/", async (req, res) => {
  const user = await UserInput.find();
  res.json(user);
});
router.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  const newUserInput = new UserInput({
    first_name: first_name,
    last_name: last_name,
    email: email
  });
  try {
    const TOKEN_SECRET = "secret";
    const saveUserInput = await newUserInput.save();
    if (!saveUserInput) throw Error("Invalid");
    const token = jwt.sign({ _id: saveUserInput._id }, TOKEN_SECRET);
    res.status(200).json({
      token,
      user: {
        id: saveUserInput.id,
        first_name: saveUserInput.first_name,
        last_name: saveUserInput.last_name,
        email: saveUserInput.email
      }
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
