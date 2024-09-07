const { Schema, model, mongoose } = require('mongoose');




const TurnoSchema = new Schema({
    fecha:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validarDiaLaboral(v);
            },
            message: props => `La fecha seleccionada (${props.value}) no es un día laboral (Lunes a Viernes)!`
        }
    },
    hora: {
        type: String,
        require: true,
        validate:{
            validator: function(v){
                return validarHora(v);
            }, message: props => `El horario indicado (${props.value}) no corresponde al horario laboral (10:00 hs a 18:00 hs)`
        }
    },
    mascota:{
        type: String,//mongoose.Schema.Types.ObjectId,
        ref: 'Mascotas',
        //required: true
    },
    veterinario:{
        type: String,//mongoose.Schema.Types.ObjectId,
        ref:'Veterinarios',
       // required: true
    },
    detalles:{
        type: String,
        maxlength: 250,
    }
}) 

function validarHora(hora) {
    // Esperamos que el formato de hora sea "HH:MM"
    const [horas, minutos] = hora.split(':').map(Number);

    if (isNaN(horas) || isNaN(minutos)) {
        return false; // Formato inválido
    }

    const totalMinutos = horas * 60 + minutos;
    const horarioApertura = 10 * 60; // 10:00 AM en minutos
    const horarioCierre = 18 * 60;   // 6:00 PM en minutos

    return totalMinutos >= horarioApertura && totalMinutos <= horarioCierre;
}

function validarDiaLaboral(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(anio, mes - 1, dia); // Mes se indexa desde 0

    const diaSemana = fechaObj.getUTCDay(); // 0 = Domingo, 6 = Sábado
    return diaSemana >= 1 && diaSemana <= 5; // Lunes a Viernes
}

const TurnoModel = model('Turnos', TurnoSchema)
module.exports = TurnoModel