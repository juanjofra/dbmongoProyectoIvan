//Rutas de usuarios
const express = require('express');
const router = express.Router();
const usuarioControler = require('../controlers/usuarioControler');

//Crear un usuarios
//api/usuarios
router.post('/',
usuarioControler.crearUsuario
);

module.exports = router;