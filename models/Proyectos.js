const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    registro: {
        type: Date,
        default: Date.now
    }

});

ProyectoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Proyecto', ProyectoSchema);