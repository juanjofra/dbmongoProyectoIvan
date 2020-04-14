//Rutas de Clientes
const express = require('express');
const router = express.Router();
const clienteControler = require('../controlers/clienteContoler');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

//Crear un Clientes
//api/clientes
router.get('/',
    authMiddleware,
    clienteControler.index
);

router.post('/', authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    clienteControler.store
);



module.exports = router;