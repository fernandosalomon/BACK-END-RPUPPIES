const MascotaModel = require(`../models/mascotaModel`);

const getAllPetsService = async (idUser) => {
    
    if(!user){
        return{
            mensaje: "El usuario no coincide con un usuario registrado",
            statusCode: 400,
        }
    }else{
        try{
            const user = await UserModel.findById(idUser);
            return {mascotas: user.mascotas, statusCode: 200}
        }catch(error){
            return {
                mensaje: "No se pudo obtener respuesta de la DB",
                statusCode: 500,
            }
        }
       
    }
}

const getPetService = async ({userID, mascotaID}) => {
    if(!userID){
        return{
            mensaje: "Usuario y/o mascota incorrectos o inexistentes",
            statusCode: 400,
        }
    }else{
        try {
            const user = await UserModel.findById(idUser);
            const mascota = user.mascotas.filter((mascota) => mascota._id === mascotaID);
            if(!mascota){
                return{
                    mensaje: "El usuario no coincide con un usuario registrado",
                    statusCode: 400,
                }
            }else{
                return {mascotas: user.mascotas, statusCode: 200}
            }
        } catch (error) {
            return {
                mensaje: "No se pudo obtener respuesta de la DB",
                statusCode: 500,
            }
        }
    }

}


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
    getAllPetsService,
    getPetService,
    obtenerMascotas,
    obtenerMascotaPorID,
    crear,
    actualizar,
    eliminar
};