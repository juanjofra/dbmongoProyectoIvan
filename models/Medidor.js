const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cliente = mongoose.model('Cliente');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const MedidorSchema = mongoose.Schema({
    numero : { type: Number,  required: true },
    status : { type: Boolean, required: true, default: true },
    numero_casa : Number,
    multa : { type: Boolean, default: true },
    cliente: { type: Schema.ObjectId, ref: "Cliente"  }

});


MedidorSchema.plugin(uniqueValidator);
MedidorSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Medidor', MedidorSchema);