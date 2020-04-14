const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    //Leer el token del header
    const token = req.header('auth-token');

   
     //Verificar si hay token
    if(!token){
        return res.status(401).json({ msg: 'Permiso denegado'});
    }

   
    //Validar token
    try {
        const tokencifrado = jwt.verify(token, process.env.SECRETA);
        console.log(tokencifrado);
        req.usuario = tokencifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Permiso denegado'});
    }
}