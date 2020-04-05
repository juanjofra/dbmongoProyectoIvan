//Rutas de Proyectos
const express = require('express');
const router = express.Router();
const proyectoControler = require('../controlers/proyectoControler');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

//Crear un proyectos
//api/proyectos
router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoControler.crearProyecto
);

router.get('/',
    authMiddleware,
    proyectoControler.obtenerProyectos
);

router.put('/:id',
    authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoControler.actualizarProyecto
)

router.delete('/:id',
    authMiddleware,
    proyectoControler.eliminarProyecto
)

module.exports = router;