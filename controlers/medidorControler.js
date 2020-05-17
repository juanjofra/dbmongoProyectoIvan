const Medidor = require("../models/Medidor");
const { validationResult } = require("express-validator");

exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el Medidor
  let medidor = new Medidor(req.body);

  await medidor.save();
  res.status(200).json(medidor);
};