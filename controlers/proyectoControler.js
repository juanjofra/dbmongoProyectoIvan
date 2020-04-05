const Proyecto = require('../models/Proyectos');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearProyecto = async (req, res) => {

        //Verificar si hay errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()});
        }

    let proyecto = new Proyecto(req.body);
    await proyecto.save();
    res.status(200).json(proyecto);

}

