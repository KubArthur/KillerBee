const express = require("express");
const router = express.Router();
const Process = require("../models/process");
const Log = require("../models/log");

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      model,
      steps_and_descriptions_of_validation_tests,
    } = req.body;

    let process = await Process.create({
      name,
      description,
      model,
      steps_and_descriptions_of_validation_tests,
      isActive: true,
    });

    const logMessage = `Swagger created process: ${name} - ${description} - ${model} - ${steps_and_descriptions_of_validation_tests}`;

    await Log.create({
      code: logMessage,
    });

    res.status(201).json({
      message: "Process created successfully",
      process,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const process = await Process.findAll({ where: { isActive: true } });

    if (process.length === 0) {
      return res.status(404).json({ message: "No process found" });
    }

    const logMessage = `Swagger fetched processes`;

    await Log.create({
      code: logMessage,
    });

    res.status(200).json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const {
      id_process,
      name,
      description,
      model,
      steps_and_descriptions_of_validation_tests,
    } = req.body;

    let process = await Process.findOne({ where: { id_process } });

    await process.update({
      name,
      description,
      model,
      steps_and_descriptions_of_validation_tests,
    });

    const logMessage = `Swagger updated process: ${id_process} - ${name} - ${description} - ${model} - ${steps_and_descriptions_of_validation_tests}`;

    await Log.create({
      code: logMessage,
    });

    res.status(200).json({
      message: "Process updated successfully",
      process,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id_process", async (req, res) => {
  try {
    const { id_process } = req.params;

    const process = await Process.findOne({ where: { id_process } });

    if (!process) {
      return res.status(404).json({ message: "Process not found" });
    }

    process.isActive = false;
    await process.save();

    const logMessage = `Swagger deleted process: ${id_process}`;

    await Log.create({
      code: logMessage,
    });

    res.status(200).json({
      message: "Process deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
