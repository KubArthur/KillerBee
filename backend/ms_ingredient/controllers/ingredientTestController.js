const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient");
const Log = require("../../ms_modele/models/log");

router.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;

    let ingredient = await Ingredient.create({
      name,
      description,
      isActive: true,
    });

    const logMessage = `Swagger created ingredient: ${name} - ${description}`;

    await Log.create({
      code: logMessage,
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

    const logMessage = `Swagger fetched ingredients`;

    await Log.create({
      code: logMessage,
    });

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

    const logMessage = `Swagger updated ingredient: ${id_ingredient}`;

    await Log.create({
      code: logMessage,
    });

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

    const logMessage = `Swagger deleted ingredient: ${id_ingredient}`;

    await Log.create({
      code: logMessage,
    });

    res.status(200).json({
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
