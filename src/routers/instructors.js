const express = require("express");
const router = express.Router();
const Class = require("../models/classSchema");
const auth = require("../middlewares/authentication");

router.get("/instructors", auth, async (req, res) => {
  // validate if user is instructor or student
  if (req.instructorAuth) {
    return res.send(req.user);
  } else {
    return res.status(401).send("Unauthenticated user");
  }
});

router.post("/instructors", async (req, res) => {
  try {
    // create a new class
    const newClass = new Class(req.body);
    if (await newClass.save()) {
      res.status(200).send("Class Created Successfully");
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

router.patch("/instructors", async (req, res) => {
  try {
    // classId expected from client side
    if (await Class.findByIdAndUpdate(req.body.classId, req.body)) {
      return res.status(200).send("Update Successfully");
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

router.delete("/instructors", async (req, res) => {
  try {
    // classId expected from client side
    if (await Class.findByIdAndDelete(req.body.classId)) {
      return res.status(200).send("Deleted Successfully");
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

module.exports = router;
