const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = mongoose.Schema({
    nombre : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,

    },
    registro: {
        type: Date,
        default: Date.now
    }

});

UsuarioSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Usuario', UsuarioSchema);