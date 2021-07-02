const express = require("express");
const router = express.Router();
const Class = require("../models/classSchema");
const auth = require("../middlewares/authentication");
const User = require("../models/userSchema");

router.get("/student", auth, async (req, res) => {
  try {
    // "req.user" get from auth middleware
    if (user) {
      const myClasses = await Class.find(
        {
          _id: { $in: req.user.registeredClass },
        },
        { title: 1, date: 1, time: 1, createdTime: 1, _id: 0 }
      );
      if (myClasses) {
        return res.status(200).send(myClasses);
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

module.exports = router;
