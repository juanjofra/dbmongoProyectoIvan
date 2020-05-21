const mongoose = require('mongoose');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const ProductosSchema = mongoose.Schema({
    producto: { type:String, required: true},
    cantidad: { type:Number, required: true},
    precio: { type:Number, required: true},
    active : { type: Boolean, required: true, default: true },
    date: { type: Date, default: Date.now()}
});



ProductosSchema.plugin(uniqueValidator);
ProductosSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Productos', ProductosSchema);