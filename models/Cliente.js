const mongoose = require('mongoose');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const ClienteSchema = mongoose.Schema({
    nombre : { type: String,  required: true },
    ci : String,
    cel: { type:Number, required: true},
    direccion : String,
    active : { type: Boolean, default: true },
    date: { type: Date, default: Date.now()}


});

ClienteSchema.plugin(uniqueValidator);
ClienteSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Cliente', ClienteSchema);


