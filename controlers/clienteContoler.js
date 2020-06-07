const Cliente = require("../models/Cliente");
const { validationResult } = require("express-validator");

//Funcion que devuelve todos los clientes paginados
exports.index = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const option = {
      page,
      limit: parseInt(limit),
      sort: { nombre: 1 }
    }

    const clientes = await Cliente.paginate( {}, option);
    res.status(200).json( clientes );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Error en la consulta" });
  }
};

exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el cliente
  let cliente = new Cliente(req.body);

  await cliente.save();
  res.status(200).json(cliente);
};

exports.update = async (req, res) => {
  try {
    const clienteId = req.params.id;
    let cliente = await Cliente.findByIdAndUpdate({ _id: clienteId}, { $set: req.body}, { new: true});

    res.status(201).json({
      msg: "Se actualizo el Cliente",
      obj: cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.active_desactive = async (req, res) => {
  try {
    const clienteId = req.params.id;
    let cliente = await Cliente.findById(clienteId);

    cliente.active = !cliente.active
    cliente.save();

    const mensaje = cliente.active ? "Activado" : "Desactivado"; 

    res.status(201).json({ msg: `Cliente ${mensaje}`  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

//Funcion que devuelve todos los clientes de acuerdo a parametros ingresados paginados
exports.buscador = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const { nombre="", direccion="", cel='' } = req.body;
    console.log(req.body);

    const option = {
      page,
      limit: parseInt(limit),
      sort: { nombre: 1 }
    }

    const clientes = await Cliente.paginate( {"nombre": {'$regex': nombre, '$options': 'i'}, "direccion": {'$regex': direccion, '$options': 'i'}},option);
    res.status(200).json( clientes );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Error en la consulta" });
  }
};
