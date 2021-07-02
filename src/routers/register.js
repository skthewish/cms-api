const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    // validate
    if (await User.findOne({ email: userData.email })) {
      return res.status(400).send("User already exist");
    }
    // create new user
    const user = new User(userData);

    // hash password
    if ((user.password = await bcrypt.hash(user.password, 12))) {
      if (await user.save()) {
        return res.status(201).send("User Registerd Successfully");
      }
    }

    // save user
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

module.exports = router;
