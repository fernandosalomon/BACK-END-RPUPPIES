const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'],
    },
    contrasenia: {
        type: String,
        required: true,
        minlength: 8,
    },
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        match: [/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'],
    },
    apellido: {
        type: String,
        required: true,
        minlength: 3,
        match: [/^[a-zA-Z\s]+$/, 'El apellido solo puede contener letras y espacios'],
    },
    telefono: {
        type: String,
        required: true,
        match: [/^\d+$/, 'El teléfono debe contener solo números'],
        minlength: 7,
        maxlength: 15
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    bloqueado: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function () {
    const { contrasenia, ...usuario } = this.toObject();
    return usuario;
}

const UsuarioModel = model('Usuario', UsuarioSchema);
module.exports = UsuarioModel;