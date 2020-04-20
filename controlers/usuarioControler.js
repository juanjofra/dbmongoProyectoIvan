const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Metodo para crear un nuevo usuario
exports.rergisterUser = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }

  //Destructuracion de variables
  const { email, password, repeatPassword } = req.body;

  try {
    //Se verifica que el ya exista
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe." });
    }

    //Verificar los password
    if (password === repeatPassword) {
      //Se crea al usuario con los datos recibidos
      usuario = new Usuario();
      usuario.email = email;

      //Se encripta la contraseña
      const salt = await bcryptjs.genSalt(10);
      usuario.password = await bcryptjs.hash(password, salt);

      //Se crea el usuario en la base de datos
      await usuario.save();
    } else {
      return res.status(404).json({ msg: "Las contraseñas no coinciden" });
    }

    //Crear el Jwt
    const paylod = {
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    };

    //Firmar el Jwt
    jwt.sign(
      paylod,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Ocurrio un error");
  }
};
