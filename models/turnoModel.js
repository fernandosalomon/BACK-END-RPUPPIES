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
        },
        match: [/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,'Ingrese un formato de fecha valido']
    },
    hora: {
        type: String,
        require: true,
        validate:{
            validator: function(v){
                return validarHora(v);
            }, message: props => `El horario indicado (${props.value}) no corresponde al horario laboral (10:00 hs a 18:00 hs)`
        },
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/,'Ingrese un formato de hora valido']
    },
    mascota:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mascotas',
        required: true
    },
    veterinario:{
        type: String,
        ref:'Veterinarios',
        required: true
    },
    detalles:{
        type: String,
        maxlength: 250,
    }

}) 

function validarHora(hora) {
    
    const [horas, minutos] = hora.split(':').map(Number);

    if (isNaN(horas) || isNaN(minutos)) {
        return false; 
    }

    const totalMinutos = horas * 60 + minutos;
    const horarioApertura = 10 * 60; 
    const horarioCierre = 18 * 60;  

    return totalMinutos >= horarioApertura && totalMinutos <= horarioCierre;
}

function validarDiaLaboral(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(anio, mes - 1, dia); 

    const diaSemana = fechaObj.getUTCDay(); 
    return diaSemana >= 1 && diaSemana <= 5; 
}

const TurnoModel = model('Turnos', TurnoSchema)
module.exports = TurnoModel