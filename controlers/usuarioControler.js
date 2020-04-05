
const Usuario = require('../models/Usuarios');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Metodo para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {

    //Verificar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Destructuracion de variables
    const { email, password } = req.body;

    try {
        //Se verifica que el ya exista
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El usuario con el email ingresado ya existe.'});
        }

        //Se crea al usuario con los datos recibidos
        usuario = new Usuario(req.body);
       
        //Se encripta la contraseña
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //Se crea el usuario en la base de datos
        await usuario.save();

        //Crear el Jwt
        const paylod = {
            usuario: {
                id: usuario.id
            }
        }

        //Firmar el Jwt
        jwt.sign(paylod, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token })
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrio un error');
    }
}