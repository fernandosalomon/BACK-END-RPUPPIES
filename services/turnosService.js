const TurnoModel = require('../models/turnoModel')

const obtenerTurnos = async () => {
    const turnos = await TurnoModel.find();
    if(!turnos){
        return{
            mensajeError: "No hay Turnos que mostrar"
        };
    }
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
        return{
        mensajeError: "Turno inexistente"
        }
    }

    const {fecha, hora, mascota, veterinario, detalles} = body;
    const turnoEditado = {}
    if (fecha) turnoEditado.fecha = fecha;
    if (hora) turnoEditado.hora = hora;
    if (mascota) turnoEditado.mascota = mascota;
    if (veterinario) turnoEditado.veterinario = veterinario;
    if (detalles) turnoEditado.detalles = detalles

    if (Object.keys(turnoEditado).length > 0) {
        const turnoTerminado = await TurnoModel.findByIdAndUpdate(
            {_id: idTurno},
            body,
            {new : true}
        );
        if (!turnoTerminado) {
            return {
                mensajeError: "Turno no encontrado"
            };
        }
        return turnoTerminado;
    } else {
        return {
            mensajeError: "Error al actualizar Turno"
        };
    }

}

const eliminar = async (idTurno) => {
    if (!idTurno) {
        return {
            mensajeError: "ID Incorrecto"
        };
    }

    const turnoEliminado = await TurnoModel.findByIdAndDelete(idTurno);

    if (!turnoEliminado) {
        return {
            mensajeError: "Mascota no encontrada"
        };
    }

    return {
        mensaje: "Mascota eliminada con éxito",
        mascotaEliminada
    };
}

module.exports ={
    obtenerTurnos,
    obtenerUnTurno,
    agregar,
    editar,
    eliminar
}