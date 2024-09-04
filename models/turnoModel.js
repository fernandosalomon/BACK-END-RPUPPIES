const { Schema, model } = require('mongoose');



const TurnoSchema = new Schema({
    fecha:{
        type: Date,
        required: true,
        validate: {
            validate: {
                validator: function(v) {
                    return validarDiaLaboral(v);
                },
                message: props => `La fecha seleccionada (${props.value.toDateString()}) no es un día laboral (Lunes a Viernes)!`
            }
        }
    },
    hora: {
        type: String,
        require: true,
        validate:{
            validator: function(v){
                return validarHora(v);
            }, message: props => `El horario indicado (${props.value.toISOString().slice(11, 16)}) no corresponde al horario laboral (10:00 hs a 18:00 hs)`
        }
    },
    mascota:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mascotas',
        required: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Veterinarios',
        required: true
    },
    detalles:{
        type: String,
        maxlength: 250,
    }
}) 

function validarHora(fecha) {
    const hora = fecha.getUTCHours();
    const minutos = fecha.getUTCMinutes(); 

    const totalMinutos = hora * 60 + minutos;

    const horarioApertura = 10 * 60;
    const horarioCierre = 18 * 60;
    return totalMinutos >= horarioApertura && totalMinutos <= horarioCierre;
}

function validarDiaLaboral(fecha) {
    const diaSemana = fecha.getUTCDay();
    return diaSemana >= 1 && diaSemana <= 5;
}

const TurnoModel = model('Turnos', TurnoSchema)
module.exports = TurnoModel