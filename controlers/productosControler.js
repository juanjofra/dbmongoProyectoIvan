const Productos = require("../models/Productos");
const { validationResult } = require("express-validator");

exports.index = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const option = {
      page,
      limit: parseInt(limit),
      sort: { date: "desc" }
    }

    const productos = await Productos.paginate( {}, option);
    res.status(200).json( productos );
  } catch (error) {
    console.log(error.message, 'Error productoControler funcion index');
    res.status(500).json({ msg: "Error en la consulta" });
  }
};


exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el Productos
  let productos = new Productos(req.body);

  await productos.save();
  res.status(200).json(productos);
};


exports.update = async (req, res) => {
  try {
    const productosId = req.params.id;
    let productos = await Productos.findByIdAndUpdate({ _id: productosId}, { $set: req.body}, { new: true});

    res.status(201).json({
      msg: "Producto actualizado",
      obj: productos,
    });
  } catch (error) {
    console.log(error, 'Error productosControler funcion update');
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.active_desactive = async (req, res) => {
  try {
    const productosId = req.params.id;
    let productos = await Productos.findById(productosId);

    productos.active = !productos.active
    productos.save();

    const mensaje = productos.active ? "Activado" : "Desactivado"; 

    res.status(201).json({ msg: `Productos ${mensaje}`  });
  } catch (error) {
    console.log(error, 'Error productosControler funcion active_desactive');
    res.status(500).json({ msg: "Error en el servidor" });
  }
};