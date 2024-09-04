const { Schema, model } = require('mongoose');

const VeterinarioModel = new Schema({
    nombre:{
        type: String,
        require: true
    },
    mail:{
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'],
    },
    telefono:{
        type: Number,
        unique: true
    }
})