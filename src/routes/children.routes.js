const express = require("express");
const router = express.Router();
const statusHandler = require("express-mongoose-status");

// Modelo niño
const Child = require("../models/child");
const Supervisor = require("../models/supervisor");

// GET todos los niños
router.get("/", async (req, res) => {
  await Child.find((err, data) => {
    return statusHandler(err, res, data);
  });
});

// GET niño por nombre y apellido
router.get("/find", async (req, res) => {
  await Child.findOne(
    {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
    },
    (err, data) => {
      statusHandler(err, res, data);
    }
  );
});

// POST niño
router.post("/", async (req, res) => {
  const { nombre, apellido, edad, supervisor } = req.body;
  const child = new Child({ nombre, apellido, edad, supervisor });
  await child.save((err, data) => {
    statusHandler(err, res, data, "Se registro un nuevo niño", 201);
  });
  const sup = await Supervisor.findById({ _id: child.supervisor });
  sup.ninos.push(child);
  await sup.save();
});

// PUT niño por nombre y apellido
router.put("/:id", async (req, res) => {
  const { nombre, apellido } = req.body;
  const newChild = { nombre, apellido };
  await Child.findByIdAndUpdate(req.params.id, newChild, (err, data) => {
    statusHandler(err, res, data, "Se actualizo los datos del niño");
  });
});

module.exports = router;
