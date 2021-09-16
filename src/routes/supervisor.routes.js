const express = require("express");
const router = express.Router();
const statusHandler = require("express-mongoose-status");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Supervisor = require("../models/supervisor");

//Autenticación de usuario
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No existe el usuario");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Autenticación exitosa");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  Supervisor.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("Ya existe el usuario");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new Supervisor({
        usuario: req.body.username,
        contrasena: hashedPassword,
      });
      await newUser.save();
      res.send("Usuario creado");
    }
  });
});

router.get("/", (req, res) => {
  res.send(req.user)
});

module.exports = router;
