//Rutas de Clientes
const express = require("express");
const router = express.Router();
const clienteControler = require("../controlers/clienteContoler");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//Crear un Clientes
//api/clientes
router.get("/", clienteControler.index);

router.post("/register", [check("nombre", "El nombre es obligatorio").not().isEmpty()], clienteControler.store );

router.put("/update/:id", clienteControler.update );

router.put("/active_desactive/:id", clienteControler.active_desactive );

module.exports = router;
