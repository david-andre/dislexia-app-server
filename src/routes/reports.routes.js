const express = require("express");
const router = express.Router();
const statusHandler = require("express-mongoose-status");

// Modelo actividad
const Activity = require("../models/activity");

// GET todos los actividades
router.get("/", async (req, res) => {
  await Activity.find({ usuario: "612e67614c524b34e4811f92" }, (err, data) => {
    return statusHandler(err, res, data);
  });
});



module.exports = router;
