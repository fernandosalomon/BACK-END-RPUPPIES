const { Schema, model } = require('mongoose');



const TurnoSchema = new Schema({
    fecha:{
        type: Date,
        require: true,
    },
    hora: {
        type: String,
        require: true,
    },
    mascota:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mascotas',
        require: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Veterinarios',
        require: true
    },
    detalles:{
        type: String,
        maxlength: 250,
    }
}) 

const TurnoModel = model('Turnos', TurnoSchema)
module.exports = TurnoModel