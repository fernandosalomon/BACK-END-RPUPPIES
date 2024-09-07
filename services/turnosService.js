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

    // Verificar si el turno existe
    const turnoExistente = await TurnoModel.findById(idTurno);
    if (!turnoExistente) {
        return {
            mensajeError: "Turno no encontrado"
        };
    }

    // Actualizamos los campos que vienen en body
    const { fecha, hora, mascota, veterinario, detalles } = body;
    const turnoEditado = {};
    
    if (fecha) turnoEditado.fecha = fecha;
    if (hora) turnoEditado.hora = hora;
    if (mascota) turnoEditado.mascota = mascota;
    if (veterinario) turnoEditado.veterinario = veterinario;
    if (detalles) turnoEditado.detalles = detalles;

    if (Object.keys(turnoEditado).length > 0) {
        const turnoTerminado = await TurnoModel.findByIdAndUpdate(
            idTurno,
            turnoEditado,
            { new: true }
        );
        
        return turnoTerminado;
    } else {
        return {
            mensajeError: "No hay campos para actualizar"
        };
    }
};

const eliminar = async (idTurno) => {
    if (!idTurno) {
        return {
            mensajeError: "ID Incorrecto"
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
    eliminar
}