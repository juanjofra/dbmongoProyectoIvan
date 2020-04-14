const Cliente = require('../models/Cliente');
const { validationResult } = require('express-validator');


exports.index = async (req, res) => {
    try {
        const clientes = await cliente.find();
        res.status(200).json({clientes});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en la consulta'});
    }
   
    
}

exports.store = async (req, res) => {

    //Verificar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Creamos el cliente
    let cliente = new Cliente(req.body);
    console.log(cliente)

    await cliente.save();
    res.status(200).json(cliente);

}



exports.update = async (req, res) => {
    try {
    const proyectoId = req.params.id;
    let proyecto = await Proyecto.findById(proyectoId);
   
    //Verificar que sea el usuario logueado el que quira modificar el proyecto
    if(proyecto.creador.toString() !== req.usuario.id){
       return res.status(403).json({ msg: 'Permiso denegado lalala'});
    }
   
    proyecto.nombre = req.body.nombre;
    await proyecto.save();
    
    res.status(201).json({ 
        msg: 'Se actualizo el proyecto',
        obj: proyecto
    })
    

   } catch (error) {
    console.log(error);
       res.status(500).json({ msg: 'Error en el servidor'});
   }
}

exports.eliminarProyecto = async (req, res) =>{
    try {
        const proyectoId = req.params.id;
        let proyecto = await Proyecto.findById(proyectoId);
       
        //Verificar que sea el usuario logueado el que quira modificar el proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
           return res.status(403).json({ msg: 'Permiso denegado lalala'});
        }

        await proyecto.remove();

        res.status(201).json({ msg: 'Proyecto Eliminado'});
    } catch (error) {
        
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor'});
    }
}
