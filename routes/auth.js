const express = require('express');
const router = express.Router();
const authControler = require('../controlers/authControler');
const { check } = require('express-validator');


router.post('/login', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'La contraseña debe tener minimo 5 caracteres').isLength({ min: 5 })
],
    authControler.loginUsuario
);

module.exports = router;