const express = require("express");
const router = express.Router();
const statusHandler = require("express-mongoose-status");

// Modelo actividad
const Activity = require("../models/activity");
const Child = require("../models/child");

// GET todos los actividades
router.get("/", async (req, res) => {
  await Activity.find((err, data) => {
    return statusHandler(err, res, data);
  });
});

// GET actividad por nombre y apellido
router.get("/findByChild", async (req, res) => {
  await Activity.find(
    {
      child: req.body.nino,
    },
    (err, data) => {
      statusHandler(err, res, data);
    }
  );
});

// POST actividad
router.post("/", async (req, res) => {
  const { nombre, correctas, incorrectas, nino } = req.body;
  const activity = new Activity({ nombre, correctas, incorrectas, nino });
  await activity.save((err, data) => {
    statusHandler(err, res, data, "Se registro una nueva actividad", 201);
  });
  const nin = await Child.findById({ _id: activity.nino });
  nin.actividades.push(activity);
  await nin.save();
});

module.exports = router;
