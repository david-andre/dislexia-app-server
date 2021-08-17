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
router.get("/:nombre/:apellido", async (req, res) => {
  const child = await User.findOne({
    nombre: req.params.nombre,
    apellido: req.params.apellido,
  });
  res.json(child);
});

// PUT niño por nombre y apellido
router.put("/:nombre/:apellido", async (req, res) => {
  const newUser = { nombre, apellido };
  await Child.findOneAndUpdate({ correo: req.params.correo }, newUser);
  res.json({ status: `Se actualizo los datos de ${newUser}` });
});

module.exports = router;
