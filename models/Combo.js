const mongoose = require('mongoose');
const mogoosePaginate = require('mongoose-paginate-v2');
var uniqueValidator = require('mongoose-unique-validator');

const ComboSchema = mongoose.Schema({
    producto: { type:String, required: true},
    cantidad: { type:Number, required: true},
    precio: { type:Number, required: true},
    date: { type: Date, default: Date.now()}
});


ComboSchema.plugin(uniqueValidator);
ComboSchema.plugin(mogoosePaginate);

module.exports = mongoose.model('Combo', ComboSchema);