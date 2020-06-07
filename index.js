const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const conectarDB = require('./config/db');
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const clientes = require('./routes/clientes');
const proyectos = require('./routes/proyectos');
const pedidos = require('./routes/Pedidos');
const productos = require('./routes/Productos');
const combo = require('./routes/Combo');



//crear el server
const app = express();

//conectar bd mongo
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar express .json
app.use(express.json({ extended: false }));

//crear puerto de escucha
const port = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/clientes', clientes);
app.use('/api/proyectos', proyectos);
app.use('/api/pedidos', pedidos);
app.use('/api/productos', productos);
app.use('/api/combo', combo);

//definir ruta raiz
app.get('/', (req, res) => {
    res.send('Desde el server')
});

const server = http.createServer(app);
const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");
   
    socket.on("ChangeCliente", () => getApiAndEmit(socket));
   
  });
  
  const getApiAndEmit = socket => {
    
    socket.broadcast.emit("ChangeCliente");
    socket.emit("ChangeCliente");
  };

//iniciar server
server.listen(port, () => {
    console.log(`El server esta escuchando en: http://localhost:${port}`)
});