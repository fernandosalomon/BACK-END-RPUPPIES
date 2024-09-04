const { Schema, model } = require('mongoose');

const VeterinarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        maxlength: 30
    },
    mail:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'],
        maxlength: 50,
    },
    telefono:{
        type: Number,
        unique: true,
        maxlength: 20
    },
    direccion:{
        type: String,
        maxlength: 100
    }
})

const VeterinarioModel = model('Veterinarios', VeterinarioSchema)
module.exports = VeterinarioModel