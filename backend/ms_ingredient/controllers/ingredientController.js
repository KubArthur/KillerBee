const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient");

router.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;

    let ingredient = await Ingredient.create({
      name,
      description,
      isActive: true,
    });

    res.status(201).json({
      message: "Ingredient created successfully",
      ingredient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({ where: { isActive: true } });

    if (ingredients.length === 0) {
      return res.status(404).json({ message: "No ingredients found" });
    }

    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { id_ingredient, name, description } = req.body;

    let ingredient = await Ingredient.findOne({ where: { id_ingredient } });

    await ingredient.update({ name, description });
    res.status(200).json({
      message: "Ingredient updated successfully",
      ingredient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id_ingredient", async (req, res) => {
  try {
    const { id_ingredient } = req.params;

    const ingredient = await Ingredient.findOne({ where: { id_ingredient } });

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    ingredient.isActive = false;
    await ingredient.save();
    res.status(200).json({
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
