const express = require("express");
const router = express.Router();
const Modele = require("../models/modele");
const Cook = require("../models/cook");

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      unit_price_excluding_tax,
      range,
      weights,
      ingredients,
    } = req.body;

    let modele = await Modele.create({
      name,
      description,
      unit_price_excluding_tax,
      range,
      weights,
      isActive: true,
    });

    for (let ingredientId of ingredients) {
      await Cook.create({
        id_modele: modele.id_modele,
        id_ingredient: ingredientId,
      });
    }

    res.status(201).json({
      message: "Modele et relations Cook créés avec succès !",
      modele,
    });
  } catch (error) {
    console.error("Erreur lors de la création du modele:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const modeles = await Modele.findAll({
      where: { isActive: true },
      include: [
        {
          model: Cook,
          attributes: ["id_modele", "id_ingredient"],
        },
      ],
    });

    if (modeles.length === 0) {
      return res.status(404).json({ message: "No modeles found" });
    }

    res.status(200).json(modeles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const {
      id_modele,
      name,
      description,
      unit_price_excluding_tax,
      range,
      weights,
      ingredients,
    } = req.body;

    let modele = await Modele.findOne({ where: { id_modele } });

    if (!modele) {
      return res.status(404).json({ message: "Modele not found" });
    }

    await modele.update({
      name,
      description,
      unit_price_excluding_tax,
      range,
      weights,
    });

    if (ingredients && ingredients.length > 0) {
      await Cook.destroy({ where: { id_modele: id_modele } });

      for (let ingredientId of ingredients) {
        await Cook.create({
          id_modele: modele.id_modele,
          id_ingredient: ingredientId,
        });
      }
    }

    res.status(200).json({
      message: "Modele updated successfully",
      modele,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id_modele", async (req, res) => {
  try {
    const { id_modele } = req.params;

    const modele = await Modele.findOne({ where: { id_modele } });

    if (!modele) {
      return res.status(404).json({ message: "Modele not found" });
    }

    modele.isActive = false;
    await modele.save();

    res.status(200).json({
      message: "Modele deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
