//Rutas de Clientes
const express = require("express");
const router = express.Router();
const comboControler = require("../controlers/comboControler");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//Crear un Pedidos
//api/pedidos
router.get("/", comboControler.index); 

router.post("/register", [check("producto", "El numero es obligatorio").not().isEmpty()], comboControler.store );

router.put("/update/:id", comboControler.update );

// router.put("/active_desactive/:id", pedidosControler.active_desactive );

module.exports = router;