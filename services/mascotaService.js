const MascotaModel = require(`../models/mascotaModel`);

const obtenerMascotas = async () => {
    const mascotas = await MascotaModel.find();
    if(!mascotas){
        return{
            mensajeError: "Mascotas no encontradas"
        };
    }
    return mascotas;
}

const obtenerMascotaPorID = async (idMascota) => {
    if(!idMascota){
        return{
            mensajeError: "ID Incorrecto"
        };
    }

    const mascota = await MascotaModel.findOne({_id: idMascota});

    if(!mascota){
        return{
            mensajeError: "Mascota no encontrada"
        };
    }
    return mascota;
}

const crear = async (body) => {
    const { nombre, especie } = body;

    if (nombre && especie) {
        const nuevaMascota = new MascotaModel(body);
        nuevaMascota.save();
        return nuevaMascota;
    } else {
        return {
            mensajeError: "Faltan campos obligatorios para crear una nueva mascota"
        };
    }
}

const actualizar = async (idMascota, body) => {
    if (!idMascota) {
        return {
            mensajeError: "ID Incorrecto"
        };
    }

    const { nombre, especie } = body;
    const camposPermitidos = {};
    if (nombre) camposPermitidos.nombre = nombre;
    if (especie) camposPermitidos.especie = especie;

    if (Object.keys(camposPermitidos).length > 0) {
        const mascotaActualizada = await MascotaModel.findByIdAndUpdate(
            {_id: idMascota},
            body,
            {new: true}
        );
        if (!mascotaActualizada) {
            return {
                mensajeError: "Mascota no encontrada"
            };
        }
        return mascotaActualizada;
    } else {
        return {
            mensajeError: "Error al actualizar mascota"
        };
    }
}


const eliminar = async (idMascota) => {
    if (!idMascota) {
        return {
            mensajeError: "ID Incorrecto"
        };
    }

    const mascotaEliminada = await MascotaModel.findByIdAndDelete(idMascota);

    if (!mascotaEliminada) {
        return {
            mensajeError: "Mascota no encontrada"
        };
    }

    return {
        mensaje: "Mascota eliminada con éxito",
        mascotaEliminada
    };
}


module.exports = {
    obtenerMascotas,
    obtenerMascotaPorID,
    crear,
    actualizar,
    eliminar
};