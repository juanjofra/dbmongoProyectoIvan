//Rutas de Proyectos
const express = require('express');
const router = express.Router();
const proyectoControler = require('../controlers/proyectoControler');
const { check } = require('express-validator');

//Crear un proyectos
//api/proyectos
router.post('/create',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoControler.crearProyecto
);

module.exports = router;