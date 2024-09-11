const TurnoModel = require('../models/turnoModel')
const {mongoose} =require ('mongoose')

const obtenerTurnos = async () => {
    const turnos = await TurnoModel.find();
    if(turnos.length === 0){
        return{
            mensajeError: "No hay Turnos que mostrar"
        };
    }
    return turnos
}

const obtenerUnTurno = async (idTurno) => {
    if(!idTurno)
        return{
        mensajeError: "Turno inexistente"
        }
    
    const turno = await TurnoModel.findOne({_id: idTurno})
    if(!turno){
        return{
            mensajeError: "Turno no encontrado"
        };
    }
    return turno;
}

const agregar = async (body) => {
    const {fecha, hora, mascota, veterinario, detalles} = body;
    
    if (!mongoose.Types.ObjectId.isValid(mascota)){
        return {
            mensajeError: "ID de mascota Invalido"
        }
    }

    const [horas, minutos] = hora.split(':').map(Number);
    
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(anio, mes - 1, dia)
    const fechaProporcionada = new Date(anio, mes - 1, dia); 

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaProporcionada < fechaActual) {
        return {
            mensajeError: "No se pueden agregar fechas anteriores a la fecha actual"
        };
    }

    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const esHoraValida = regexHora.test(hora);
    if(!esHoraValida){
        return{
            mensajeError: "formato de Hora invalido"
        }
    }

    
    if (isNaN(horas) || isNaN(minutos)) {
        return false;
    }

    const totalMinutos = horas * 60 + minutos;
    const horarioApertura = 10 * 60; 
    const horarioCierre = 18 * 60;  
    
    if(!((totalMinutos >= horarioApertura)&&(totalMinutos <= horarioCierre))){
        return{
            mensajeError: "Horario Invalido, el horario indicado debe estar entre las 10:00 y 16:00"
        }
    }


    const diaSemana = fechaObj.getUTCDay();
if (diaSemana < 1 || diaSemana > 5) {
    return {
        mensajeError: "Solo atendemos de Lunes a Viernes!"
    };
}


    const turnoDuplicado = await TurnoModel.findOne({ fecha, hora, veterinario });
 
    if (turnoDuplicado) {
        return {
            mensajeError: "Ya existe un turno con este Veterinario la misma fecha y hora"
        };
    }

    const regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const esFechaValida = regexFecha.test(fecha);
    if(!esFechaValida){
        return{
            mensajeError: "formato de Fecha invalido"
        }
    }

    if(fecha && hora && mascota && veterinario && detalles){
        const nuevoTurno = new TurnoModel (body)
        nuevoTurno.save();
        return nuevoTurno
    } else {
        return{
        mensajeError: "Faltan campos obligatorios"
              }
    }   

}

const editar = async (idTurno, body) => {
    if (!idTurno) {
        return {
            mensajeError: "ID de Turno no proporcionado"
        };
    }
    if (!mongoose.Types.ObjectId.isValid(idTurno)) {
        return {
            mensajeError: "ID inválido"
        };
    }
    const turnoExistente = await TurnoModel.findById(idTurno);
    if (!turnoExistente) {
        return {
            mensajeError: "Turno no encontrado"
        };
    }
    const { fecha, hora, mascota, veterinario, detalles } = body;
    
    if (!mongoose.Types.ObjectId.isValid(mascota)){
        return {
            mensajeError: "ID de mascota Invalido"
        }
    }

    const [horas, minutos] = hora.split(':').map(Number);
    
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaProporcionada = new Date(anio, mes - 1, dia); 

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaProporcionada < fechaActual) {
        return {
            mensajeError: "No se pueden agregar fechas anteriores a la fecha actual"
        };
    }

    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const esHoraValida = regexHora.test(hora);
    if(!esHoraValida){
        return{
            mensajeError: "formato de Hora invalido"
        }
    }

    
    if (isNaN(horas) || isNaN(minutos)) {
        return false;
    }

    const totalMinutos = horas * 60 + minutos;
    const horarioApertura = 10 * 60; 
    const horarioCierre = 18 * 60;  
    
    if(!((totalMinutos >= horarioApertura)&&(totalMinutos <= horarioCierre))){
        return{
            mensajeError: "Horario Invalido, el horario indicado debe estar entre las 10:00 y 16:00"
        }
    }

    const fechaObj = new Date(anio, mes - 1, dia)

    const diaSemana = fechaObj.getUTCDay();
    if (diaSemana < 1 || diaSemana > 5) {
        return {
            mensajeError: "Solo atendemos de Lunes a Viernes!"
        };
    }

    
    const regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const esFechaValida = regexFecha.test(fecha);
    if(!esFechaValida){
        return{
            mensajeError: "formato de Fecha invalido"
        }
    }
    
    const turnoEditado = {};
    
    if (!mongoose.Types.ObjectId.isValid(mascota)){
        return {
            mensajeError: "ID de mascota Invalido"
        }
    }
    if (fecha) turnoEditado.fecha = fecha;
    if (hora) turnoEditado.hora = hora;
    if (mascota) turnoEditado.mascota = mascota;
    if (veterinario) turnoEditado.veterinario = veterinario;
    if (detalles) turnoEditado.detalles = detalles;

    const turnoDuplicado = await TurnoModel.findOne({   
    fecha: turnoEditado.fecha,
    hora: turnoEditado.hora,
    veterinario: turnoEditado.veterinario,
    _id: { $ne: idTurno }
    });

    if (turnoDuplicado) {
        return {
            mensajeError: "Ya existe un turno con este Veterinario la misma fecha y hora"
        };
    }


    try {
        if (Object.keys(turnoEditado).length > 0) {
            const turnoTerminado = await TurnoModel.findByIdAndUpdate(
                idTurno,
                turnoEditado,
                { new: true },

            );
            
            return {turnoTerminado, mensaje: "turno actualizado con éxito!"};
        } else {
            return {
                mensajeError: "No hay campos para actualizar"
            };
        }
    } catch (error) {
        return {
            mensajeError: "Error al actualizar el turno",
            error: error.message
        };
    }
    
    

};

const eliminar = async (idTurno) => {

    if (!idTurno) {
        return {
            mensajeError: "ID de Turno no proporcionado"
        };
    }

    if (!mongoose.Types.ObjectId.isValid(idTurno)) {
        return {
            mensajeError: "ID inválido"
        };
    }

    const turnoEliminado = await TurnoModel.findByIdAndDelete(idTurno);

    if (!turnoEliminado) {
        return {
            mensajeError: "Turno no encontrado"
        };
    }

    return {
        mensaje: "Turno eliminado con éxito!",
        turnoEliminado
    };
}

module.exports ={
    obtenerTurnos,
    obtenerUnTurno,
    agregar,
    editar,
    eliminar,
}