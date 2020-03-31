const express = require('express');
const conectarDB = require('./config/db');

//crear el server
const app = express();

//conectar bd mongo
conectarDB();

//crear puerto de escucha
const port = 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//definir ruta raiz
app.get('/', (req, res) => {
    res.send('Desde el server')
});

//iniciar server
app.listen(port, () => {
    console.log(`El server esta escuchando en: http://localhost:${port}`)
});