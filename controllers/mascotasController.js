const servicioMascotas = require('../services/mascotaService');

const obtenerTodasLasMascotas = async (req, res) => {
    try{
        const resultado = await servicioMascotas.obtenerMascotas();
        if (resultado.mensajeError) {
            res.status(404).json({ mensaje: resultado.mensajeError });
        } else {
            res.status(200).json(resultado);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const obtenerMascota = async (req, res) => {
    try{
        const resultado = await servicioMascotas.obtenerMascotaPorID(req.params.idMascota);
        if (resultado.mensajeError) {
            res.status(404).json({ mensaje: resultado.mensajeError });
        } else {
            res.status(200).json(resultado);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const crearMascota = async (req, res) => {
    try{
        const resultado = await servicioMascotas.crear(req.body);
        if (resultado.mensajeError) {
            res.status(400).json({ mensaje: resultado.mensajeError });
        } else {
            res.status(201).json(resultado);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const crearActualizarImgMascota = async (req, res) =>{
    try {
        const resultado = await servicioMascotas.crearActualizarImg(req.file, req.params.idMascota);
        if(resultado.statusCode === 200){
            res.status(200).json({
                mensaje: "Imagen cargada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const actualizarMascota = async (req, res) => {
    try{
        const resultado = await servicioMascotas.actualizar(req.params.idMascota, req.body);

        if (resultado.mensajeError) {
            res.status(400).json({ mensaje: resultado.mensajeError });
        } else {
            res.status(200).json(resultado);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const eliminarMascota = async (req, res) => {
    try{
        const resultado = await servicioMascotas.eliminar(req.params.idMascota);

        if (resultado.mensajeError) {
            res.status(404).json({ mensaje: resultado.mensajeError });
        } else {
            res.status(200).json(resultado);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    obtenerTodasLasMascotas,
    obtenerMascota,
    crearMascota,
    crearActualizarImgMascota,
    actualizarMascota,
    eliminarMascota
}