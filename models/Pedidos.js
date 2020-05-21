const mongoose = require('mongoose');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const PedidosSchema = mongoose.Schema({
    numero : { type: Number,  required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    status : { type: String, required: true, default: 'Pendiente' }, //Pendiente, Entregado
    total : Number,
    delibery: Number,
    total_gral: Number,
    date: { type: Date, default: Date.now()},
    detalle: []
});


PedidosSchema.plugin(uniqueValidator);
PedidosSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Pedidos', PedidosSchema);