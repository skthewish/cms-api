const express = require("express");
const router = express.Router();
const Class = require("../models/classSchema");
const auth = require("../middlewares/authentication");
const User = require("../models/userSchema");

router.get("/classes", auth, async (req, res) => {
  try {
    const classes = await Class.find();
    if (classes) {
      res.status(200).send(classes);
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

router.post("/classes", async (req, res) => {
  try {
    // get data from client side : classId - of which student has registered, studentId
    // finding class and increament participants by one
    console.log(req.body.classId);
    const registeredClass = await Class.findByIdAndUpdate(
      req.body.classId,
      {
        $inc: { totalParticipants: 1 },
        $push: { participantsId: req.body.studentId },
      },
      { new: true }
    );
    console.log(registeredClass);

    // stored class id in students database so they can find their registered classes
    if (registeredClass) {
      const updateUser = await User.findByIdAndUpdate(
        req.body.studentId,
        {
          $push: { registeredClass: registeredClass._id },
        },
        { new: true }
      );
      if (updateUser) {
        return res.status(200).send("Registerd For Class Successfully");
      }
    } else {
      return res.status(500).json({ msg: error });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

module.exports = router;
