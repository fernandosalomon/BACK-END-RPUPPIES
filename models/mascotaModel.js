const {Schema, model} = require('mongoose');

const MascotaSchema = new Schema({
    nombre: {
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
    }
});

const MascotaModel = model('Mascotas', MascotaSchema);
module.exports = MascotaModel;