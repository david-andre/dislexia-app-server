const express = require("express");
const router = express.Router();

// Modelo niño
const Child = require("../models/child");

// GET todos los niños
router.get("/", async (req, res) => {
  const children = await Child.find();
  res.json(children);
});

// GET niño por nombre y apellido
router.get("/find", async (req, res) => {
  const child = await Child.findOne({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  });
  res.json(child);
});

// POST niño
router.post("/", async (req, res) => {
  const { nombre, apellido } = req.body;
  const child = new Child({ nombre, apellido });
  await child.save();
  res.json({ message: "Se registro un nuevo niño" });
});

// PUT niño por nombre y apellido
router.put("/:id", async (req, res) => {
  const { nombre, apellido } = req.body;
  const newChild = { nombre, apellido };
  await Child.findByIdAndUpdate({ nombre: req.params.id }, newChild);
  res.json({ message: `Se actualizo los datos del niño` });
});

module.exports = router;
