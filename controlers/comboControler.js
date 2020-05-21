const Combo = require("../models/Combo");
const { validationResult } = require("express-validator");


exports.index = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const option = {
      page,
      limit: parseInt(limit),
      sort: { date: "desc" }
    }

    const combo = await Combo.paginate( {}, option);
    res.status(200).json( combo );
  } catch (error) {
    console.log(error.message, 'Error comboControler funcion index');
    res.status(500).json({ msg: "Error en la consulta" });
  }
};


exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el Pedidos
  let combo = new Combo(req.body);

  await combo.save();
  res.status(200).json(combo);
};


exports.update = async (req, res) => {
  try {
    const comboId = req.params.id;
    let combo = await Combo.findByIdAndUpdate({ _id: comboId}, { $set: req.body}, { new: true});

    res.status(201).json({
      msg: "Combo actualizado",
      obj: combo,
    });
  } catch (error) {
    console.log(error, 'Error comboControler funcion update');
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
