const express = require("express");
const router = express.Router();
const Class = require("../models/classSchema");
const auth = require("../middlewares/authentication");

router.get("/instructor", auth, async (req, res) => {
  try {
    if (!req.instructorAuth) {
      return res.status(401).send("Unauthenticated user");
    }
    // "req.user" expacted from authentication middleware
    const myClasses = await Class.find(
      {
        instructorId: req.user._id,
      },
      { _id: 0, instructorId: 0, __v: 0 }
    );
    if (myClasses) {
      return res.status(200).send(myClasses);
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

/// remove student from registered class
router.delete("/instructor", async (req, res) => {
  try {
    // expacting "studentId" and "classId" from client
    const delStudent = await Class.updateOne(
      { _id: req.body.classId },
      { $pull: { participantsId: req.body.studentId } },
      { new: true }
    );
    if (delStudent) {
      return res.status(200).send("Participant Removed Successfully");
    } else {
      return res.status(500).json({ msg: error });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
module.exports = router;
