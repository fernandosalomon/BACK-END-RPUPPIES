const { Schema, model } = require('mongoose');

const dateValidator = (value) => {
    const minDate = new Date('1900-01-01');
    const maxDate = new Date();
    return value >= minDate && value <= maxDate;
};

const MascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    fechaDeNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: dateValidator,
            message: 'La fecha de nacimiento debe ser mayor a 01-01-1900 y menor o igual a la fecha actual.'
        }
    },
    sexo: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    especie: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    raza: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    colorDePelo: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    pesoKg: {
        type: Number,
        required: true,
        min: [0.1],
        max: [100],
        validate: {
            validator: Number.isFinite,
            message: 'El peso debe ser un número válido.'
        }
    },
    esterilizado: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    observaciones: {
        type: String,
        minlength: 3,
        maxlength: 250
    },
    imagen: {
        type: String,
        default: "https://asset.cloudinary.com/dmxikj53v/36c8cb8fe53082fcddbadfff6516d28b"
    }
});

const MascotaModel = model('Mascotas', MascotaSchema);
module.exports = MascotaModel;
