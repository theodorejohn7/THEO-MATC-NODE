const express = require("express");
const jwt = require("jsonwebtoken");

const Model = require("../models/healthMonk");
const router = express.Router();

//Post Method

router.post("/post", async (req, res) => {
  const bodyId = req.body.id;
  const data = new Model({
    id: req.body.id,
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    steps: req.body.steps,
  });
  const dataToSave = await data.save();
  res.status(200).json(dataToSave);
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//filter by ID 

module.exports = router;
