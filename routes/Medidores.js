//Rutas de Clientes
const express = require("express");
const router = express.Router();
const medidorControler = require("../controlers/medidorControler");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//Crear un Medidor
//api/medidores
// router.get("/", clienteControler.index);

router.post("/register", [check("numero", "El numero es obligatorio").not().isEmpty()], medidorControler.store );

// router.put("/update/:id", clienteControler.update );

// router.put("/active_desactive/:id", clienteControler.active_desactive );

module.exports = router;
