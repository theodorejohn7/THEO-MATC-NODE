const express = require("express");
const jwt = require("jsonwebtoken");

const Model = require("../models/products");
const router = express.Router();

//Post Method

router.post("/post", async (req, res) => {
  const bodyId = req.body.id;
  const data = new Model({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating,
    netWeight: req.body.netWeight,
    grossWeight: req.body.grossWeight,
    price: req.body.price,
    discPrice: req.body.discPrice,
  });

  try {
    const idStatus = await Model.findOne({ id: bodyId });
    if (idStatus) {
      return res.status(400).send({
        message: "ID already exists",
      });
    } else {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    }
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).json({ message: error.message });
  }
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
router.get("/id/:id", async (req, res) => {
  try {
    const paramsId = req.params.id;
    const data = await Model.find({ id: paramsId });
    console.log("req", req.params);
    // console.log("id",id)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//filter by category
router.get("/category/:category", async (req, res) => {
  try {
    const paramsCategory = req.params.category;
    const data = await Model.find({ category: paramsCategory });
    console.log("req", req.params);
    // console.log("id",id)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);

    console.log("req", req);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const accessToken = req.headers["x-access-token"];
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    console.log("updated ", id);
    res.send(result);
  } catch (error) {
    if (error.message === "jwt expired") {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    console.log("deleted ", id);

    res.send(`Document with ${data.title} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
