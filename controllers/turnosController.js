const servicioTurnos = require("../services/turnosService")

const obtenerTodosLosTurnos = async (req, res) => {
    const resultado = await servicioTurnos.obtenerTurnos();
    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
      } else {
        res.status(200).json(resultado);
    }
}

const obtenerTurno = async (req, res) => {
    const resultado = await servicioTurnos.obtenerUnTurno(req.params.idTurno);

    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

const agregarTurno = async (req, res) => {
    const resultado = await servicioTurnos.agregar(req.body);
    if (resultado.mensajeError) {
        res.status(400).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(201).json(resultado);
    }
}

const editarTurno = async (req, res) => {
    const resultado = await servicioTurnos.editar(req.params.idTurno, req.body);

    if (resultado.mensajeError) {
        res.status(400).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

const eliminarTurno = async (req, res) => {
    const resultado = await servicioTurnos.eliminar(req.params.idTurno);

    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

module.exports = {
    obtenerTodosLosTurnos,
    obtenerTurno,
    agregarTurno,
    editarTurno,
    eliminarTurno,
}