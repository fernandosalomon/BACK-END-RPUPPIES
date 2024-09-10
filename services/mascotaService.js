const MascotaModel = require(`../models/mascotaModel`);
const UsuarioModel = require("../models/usuarioModel");

const getAllPetsService = async (idUser) => {
    
    if(!user){
        return{
            mensaje: "El usuario no coincide con un usuario registrado.",
            statusCode: 400,
        }
    }else{
        try{
            const user = await UserModel.findById(idUser);
            return {mascotas: user.mascotas, statusCode: 200}
        }catch(error){
            return {
                mensaje: "No se pudo obtener respuesta de la DB.",
                statusCode: 500,
            }
        }
       
    }
}

const getPetService = async ({userID, mascotaID}) => {
    if(!userID){
        return{
            mensaje: "Usuario y/o mascota incorrectos o inexistentes.",
            statusCode: 400,
        }
    }else{
        try {
            const user = await UserModel.findById(idUser);
            const mascota = user.mascotas.filter((mascota) => mascota._id === mascotaID);
            if(!mascota){
                return{
                    mensaje: "El usuario no coincide con un usuario registrado.",
                    statusCode: 400,
                }
            }else{
                return {mascotas: user.mascotas, statusCode: 200}
            }
        } catch (error) {
            return {
                mensaje: "No se pudo obtener respuesta de la DB.",
                statusCode: 500,
            }
        }
    }

}

const createPetService = async (userID, petData) => {
    if(!userID || !petData){
        return{
            mensaje: "ERROR: Faltan enviar datos.",
            statusCode: 400,
        }
    }else{
        try {
            const user = await UsuarioModel.findById(userID);
            if(!user){
                return {
                    mensaje: "Usuario no encontrado",
                    statusCode: 400,
                }
            }
            if(!petData.nombre || !petData.fechaDeNacimiento || !petData.especie || !petData.raza || !petData.color || !petData.colorDePelo || !petData.pesoKg || !petData.esterilizado || !petData.domicilio){
                return {
                    mensaje: "Faltan datos obligatorios. La mascota no pudo ser creada.",
                    statusCode: 400,
                }
            }else{
                const newPet = new MascotaModel({
                    nombre: petData.nombre,
                    fechaDeNacimiento: petData.fechaDeNacimiento,
                    especie: petData.especie,
                    raza: petData.raza,
                    color: petData.color,
                    colorDePelo: petData.colorDePelo,
                    pesoKg: petData.pesoKg,
                    esterilizado: petData.esterilizado,
                    domicilio: petData.domicilio,
                })
                user.mascotas.push(newPet);
                const updatedUser = await UsuarioModel.findByIdAndUpdate(
                    userID,
                    user,
                    { new: true }
                );
                if(!updatedUser){
                    return{
                        mensaje: "Error. No se pudo crear la mascota",
                        statusCode: 500
                    }
                }else{
                    return{
                        mensaje: `${petData.nombre} fue agregada a tu lista de mascotas`,
                        statusCode: 201
                    }
                }
            } 
        }catch (error) {
            return {
                mensaje: "No se pudo obtener respuesta de la DB.",
                statusCode: 500,
            }
        }
        
        
    }
}

const updatePetService = async (userID, petData) => {
    if(!userID || !petData){
        return{
            mensaje: "ERROR: Faltan enviar datos.",
            statusCode: 400,
        }
    }
    try {
        const user = await UserModel.findById(idUser);
        if(!user){
            return{
                mensaje: "Usuario no encontrado",
                statusCode: 400,
            }  
        }
        const updatedPet = user.mascotas.filter((pet) => pet._id === petData._id);
        const posUpdatedPet = user.mascotas.indexOf((pet) => pet._id === petData._id);
        if(!updatedPet){
            return{
                mensaje: "Mascota no encontrado",
                statusCode: 400,
            }  
        }else{
            updatedPet = {petData, ...updatedPet};
            user.mascotas[posUpdatedPet] = updatedPet;
            const updatedUser = await UsuarioModel.findByIdAndUpdate(userID, user);
            if(!updatedUser){
                return{
                    mensaje: "Error: No se pudo actualizar la mascota.",
                    statusCode: 500,
                }
            }else{
                return{
                    mensaje: `${petData.nombre} se actualizó con exito`,
                    statusCode: 500,
                }
            }
        } 
    } catch (error) {
        return {
            mensaje: "No se pudo obtener respuesta de la DB.",
            statusCode: 500,
        }
    }

}

const deletePetService = async ({userID, petID}) => {
    if(!user || !petID){
        return{
            mensaje: "ERROR: Faltan enviar datos.",
            statusCode: 400,
        }
    }else{
        try {
            const user = await UserModel.findById(idUser);
            if(!user){
                return{
                    mensaje: "Usuario no encontrado",
                    statusCode: 400,
                }  
            }else{
                is_petInList = user.mascota.filter((pet) => {pet._id === petID});
                if(!is_petInList){
                    return{
                        mensaje: "Mascota no encontrada",
                        statusCode: 400,
                    }   
                }else{
                    newPetList = user.mascota.filter((pet) => {pet._id !== petID});
                    const detelePet = await UsuarioModel.findByIdAndUpdate(userID, {mascota: newPetList, ...user})
                    if(!deletePet){
                        return{
                            mensaje: "Error: No se pudo eliminar la mascota.",
                            statusCode: 500,
                        }
                    }else{
                        return{
                            mensaje: "Mascota eliminada con exito.",
                            statusCode: 200,
                        }
                    }
                }
            }
        } catch (error) {
            return {
                mensaje: "No se pudo obtener respuesta de la DB.",
                statusCode: 500,
            }
        }
    }
    
}

module.exports = {
    getAllPetsService,
    getPetService,
    createPetService,
    deletePetService,
    updatePetService,
};