const express = require("express");
const router = express.Router();

// Modelo actividad
const Activity = require("../models/activity");

// GET todos los actividades
router.get("/", async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

// GET actividad por nombre y apellido
router.get("/findByUser", async (req, res) => {
  const activity = await Activity.findOne({
    usuario: req.body.usuario
  });
  res.json(activity);
});

// POST actividad
router.post("/", async (req, res) => {
  const { nombre, correctas, incorrectas, usuario } = req.body;
  const activity = new Activity({ nombre, correctas, incorrectas, usuario });
  await activity.save();
  res.json({ status: "Se registro una nueva actividad" });
});

module.exports = router;
