const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_name: req.body.name } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!user.user_account_status) {
      return res.status(403).json({ message: "Compte utilisateur inactif" });
    }

    if (user.user_password !== req.body.password) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.user_token_access = token;

    await user.save();
    
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
