
const Usuario = require('../models/Usuarios');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Metodo para crear un nuevo usuario
exports.loginUsuario = async (req, res) => {

    //Verificar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Destructuracion de variables
    const { email, password } = req.body;

    try {
        //Se verifica que el usuario ya exista
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'Login incorrecto'});
            console.log("ya existe el usuario")
        }

        //Verificar que el password sea correcto
        const passwordVericidado = await bcryptjs.compare(password, usuario.password);
        if(!passwordVericidado){
            return res.status(400).json({ msg: "Login incorrecto"})
        }


        //Crear el Jwt
        const paylod = {
            usuario: {
                id: usuario.id,
                email: usuario.email
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