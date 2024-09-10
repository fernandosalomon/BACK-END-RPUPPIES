const servicioMascotas = require('../services/mascotaService');
const {getAllPetsService, getPetService} = require('../services/mascotaService');

const getAllPetsController = async (req, res) => {
    const result = await getAllPetsService(req.params.idUsuario);
    if(result.statusCode === 200){
        res.status(200).json(result);
    }else{
        res.status(result.statusCode).json(result.mensaje)
    }
}

const getPetController = async (req, res) => {
    const result = await getPetService(req.params.objIDUsuarioMascota);
    if(result.statusCode === 200){
        res.status(200).json(result);
    }else{
        res.status(result.statusCode).json(result.mensaje)
    }
}

//////////////////////////////////////////////////

const obtenerTodasLasMascotas = async (req, res) => {
    const resultado = await servicioMascotas.obtenerMascotas();
    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

const obtenerMascota = async (req, res) => {
    const resultado = await servicioMascotas.obtenerMascotaPorID(req.params.idMascota);

    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

const crearMascota = async (req, res) => {
    const resultado = await servicioMascotas.crear(req.body);
    if (resultado.mensajeError) {
        res.status(400).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(201).json(resultado);
    }
}

const actualizarMascota = async (req, res) => {
    const resultado = await servicioMascotas.actualizar(req.params.idMascota, req.body);

    if (resultado.mensajeError) {
        res.status(400).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

const eliminarMascota = async (req, res) => {
    const resultado = await servicioMascotas.eliminar(req.params.idMascota);

    if (resultado.mensajeError) {
        res.status(404).json({ mensaje: resultado.mensajeError });
    } else {
        res.status(200).json(resultado);
    }
}

module.exports = {
    getAllPetsController,
    getPetController,
    obtenerTodasLasMascotas,
    obtenerMascota,
    crearMascota,
    actualizarMascota,
    eliminarMascota
}