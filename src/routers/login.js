const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;

    const user = await User.findOne({ email: userData.email });

    // validate
    if (user && (await bcrypt.compare(userData.password, user.password))) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      user.token = token;

      // cookie created for 1 day
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 3600000 * 24),
        httpOnly: true,
      });

      // save token
      if (await user.save()) {
        return res.status(200).send("Looged in Succesfully");
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
