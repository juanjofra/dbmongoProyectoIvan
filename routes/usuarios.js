//Rutas de usuarios
const express = require("express");
const router = express.Router();
const usuarioControler = require("../controlers/usuarioControler");
const { check } = require("express-validator");

//api/usuarios
router.post(
  "/register",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "La contraseña debe tener minimo 5 caracteres").isLength({
      min: 5,
    }),
  ],
  usuarioControler.rergisterUser
);

module.exports = router;
