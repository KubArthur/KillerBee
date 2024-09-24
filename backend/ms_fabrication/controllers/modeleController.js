const express = require("express");
const router = express.Router();
const modele = require("../models/modele");

router.get("/", async (req, res) => {
  try {
    //

    res.status(201).json({
      //
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
