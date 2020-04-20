const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const UsuarioSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  registro: {
    type: Date,
    default: Date.now,
  },
});

UsuarioSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Usuario", UsuarioSchema);
