const Pedidos = require("../models/Pedidos");
const { validationResult } = require("express-validator");

exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el Pedidos
  let pedidos = new Pedidos(req.body);

  await pedidos.save();
  res.status(200).json(medidor);
};