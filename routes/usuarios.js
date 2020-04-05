//Rutas de usuarios
const express = require('express');
const router = express.Router();
const usuarioControler = require('../controlers/usuarioControler');
const { check } = require('express-validator');

//Crear un usuarios
//api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'La contraseña debe tener minimo 5 caracteres').isLength({ min: 5 })
    ],
    usuarioControler.crearUsuario
);

module.exports = router;