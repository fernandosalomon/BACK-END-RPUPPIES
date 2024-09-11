const dateValidator = require("../helpers/dateValidator");
const { Schema, model } = require("mongoose");
const MascotaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  especie: {
    type: String,
    enum: ["felino", "canino", "otro"],
    required: true,
  },
  sexo: {
    type: String,
    enum: ["hembra", "macho"],
    required: true,
  },
  raza: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  colorDePelo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  pesoKg: {
    type: Number,
    required: true,
    min: [0.1],
    max: [100],
    validate: {
      validator: Number.isFinite,
      message: "El peso debe ser un número válido.",
    },
  },
  esterilizado: {
    type: String,
    enum: ["true", "false"],
    required: true,
  },

  domicilio: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },

  observaciones: {
    type: String,
    minlength: 3,
    maxlength: 250,
  },
  imagen: {
    type: String,
    default:
      "https://asset.cloudinary.com/dmxikj53v/36c8cb8fe53082fcddbadfff6516d28b",
  },

  idOwner: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
});

const MascotaModel = model("Mascotas", MascotaSchema);
module.exports = MascotaModel;
