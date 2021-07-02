const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("logged out");
});

module.exports = router;
