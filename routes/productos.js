//Rutas de Clientes
const express = require("express");
const router = express.Router();
const productosControler = require("../controlers/productosControler");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//Crear un Productos
//api/productos
router.get("/", productosControler.index);

router.post("/register", [check("producto", "El producto es obligatorio").not().isEmpty()], productosControler.store );

router.put("/update/:id", productosControler.update );

router.put("/active_desactive/:id", productosControler.active_desactive );

module.exports = router;
