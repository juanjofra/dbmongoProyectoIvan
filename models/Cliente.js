const mongoose = require('mongoose');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const ClienteSchema = mongoose.Schema({
    nombre : { type: String,  required: true },
    ci : { type: String, required: true },
    direccion : String,
    barrio : String,
    active : { type: Boolean, default: true }

});

ClienteSchema.plugin(uniqueValidator);
ClienteSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Cliente', ClienteSchema);


