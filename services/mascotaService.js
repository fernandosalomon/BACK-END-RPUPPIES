const MascotaModel = require(`../models/mascotaModel`);
const cloudinary = require("../helpers/cloudinaryConfig");
const UsuarioModel = require("../models/usuarioModel");

const getAllPetsAdminService = async () => {
  try {
    const allPets = await MascotaModel.find();
    return {
      mascotas: allPets,
      statusCode: 200,
    };
  } catch (error) {
    return {
      mensaje: "No se pudo obtener respuesta de la DB.",
      statusCode: 500,
    };
  }
};

const getAllPetsService = async (userID) => {
  if (!userID) {
    return {
      mensaje: "ERROR. Faltan datos para completar la solicitud.",
      statusCode: 400,
    };
  } else {
    try {
      const user = await UsuarioModel.findById(userID);
      userPetsID = user.mascotas;
      const pets = await MascotaModel.find({ _id: { $in: userPetsID } });
      return { mascotas: pets, statusCode: 200 };
    } catch (error) {
      return {
        mensaje: "No se pudo obtener respuesta de la DB.",
        statusCode: 500,
      };
    }
  }
};

const getPetService = async (userID, mascotaID) => {
  if (!userID) {
    return {
      mensaje: "ERROR. Faltan datos para completar la solicitud.",
      statusCode: 400,
    };
  } else {
    try {
      const pet = await MascotaModel.findById(mascotaID);
      if (!pet) {
        return {
          mensaje: "La mascota y/o el usuario no existen",
          statusCode: 400,
        };
      }
      if (pet.idOwner.toString() !== userID) {
        return {
          mensaje: "El usuario no es dueño de la mascota",
          statusCode: 400,
        };
      } else {
        return {
          pet,
          statusCode: 200,
        };
      }
    } catch (error) {
      return {
        mensaje: `No se pudo obtener respuesta de la DB. ${error}`,
        statusCode: 500,
      };
    }
  }
};

const createPetService = async (userID, petData) => {
  if (!userID || !petData) {
    return {
      mensaje: "ERROR. Faltan datos para completar la solicitud.",
      statusCode: 400,
    };
  } else {
    const user = await UsuarioModel.findById(userID);
    if (!user) {
      return {
        mensaje: "El usuario no corresponde con uno registrado",
        statusCode: 400,
      };
    }

    if (
      !petData.nombre ||
      !petData.fechaDeNacimiento ||
      !petData.especie ||
      !petData.raza ||
      !petData.sexo ||
      !petData.colorDePelo ||
      !petData.pesoKg ||
      !petData.esterilizado ||
      !petData.domicilio
    ) {
      return {
        mensaje: "Faltan datos obligatorios. La mascota no pudo ser creada.",
        statusCode: 400,
      };
    } else {
      try {
        const newPet = new MascotaModel({
          nombre: petData.nombre,
          fechaDeNacimiento: petData.fechaDeNacimiento,
          especie: petData.especie,
          raza: petData.raza,
          colorDePelo: petData.colorDePelo,
          pesoKg: petData.pesoKg,
          esterilizado: petData.esterilizado,
          domicilio: petData.domicilio,
          observaciones: petData.observaciones,
          idOwner: user._id,
          sexo: petData.sexo,
        });
        await newPet.save();
        user.mascotas.push(newPet._id);
        user.save();
        return {
          mensaje: `${petData.nombre} fue agregada correctamente`,
          statusCode: 201,
        };
      } catch (error) {
        return {
          mensaje: "Error al crear la mascota en la base de datos",
          statusCode: 500,
        };
      }
    }
  }
};

const updatePetService = async (userID, mascotaID, petData) => {
  console.log(mascotaID);
  if (!userID || !mascotaID) {
    return {
      mensaje: "ERROR. Faltan datos para completar la solicitud.",
      statusCode: 400,
    };
  }
  try {
    const pet = await MascotaModel.findById(mascotaID);
    if (!pet) {
      return {
        mensaje: "La mascota y/o el usuario no existen",
        statusCode: 400,
      };
    }
    if (pet.idOwner.toString() !== userID) {
      return {
        mensaje: "El usuario no es dueño de la mascota",
        statusCode: 400,
      };
    }
    const updatedPet = await MascotaModel.findByIdAndUpdate(
      mascotaID,
      petData,
      { new: true }
    );
    return {
      mensaje: `La mascota se actualizó con exito`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      mensaje: "No se pudo obtener respuesta de la DB.",
      statusCode: 500,
    };
  }
};

const deletePetService = async (userID, petID) => {
  if (!userID || !petID) {
    return {
      mensaje: "ERROR. Faltan datos para completar la solicitud.",
      statusCode: 400,
    };
  }
  try {
    const pet = await MascotaModel.findById(petID);
    if (!pet) {
      return {
        mensaje: "La mascota y/o el usuario no existen",
        statusCode: 400,
      };
    }
    if (pet.idOwner.toString() !== userID) {
      return {
        mensaje: "El usuario no es dueño de la mascota",
        statusCode: 400,
      };
    }
    const deletedPet = await MascotaModel.findByIdAndDelete(petID);
    return {
      mensaje: "Mascota eliminada con exito.",
      statusCode: 200,
    };
  } catch (error) {
    return {
      mensaje: "No se pudo obtener respuesta de la DB.",
      statusCode: 500,
    };
  }
};

const crearActualizarImg = async (file, idMascota) => {
  try {
    const mascota = await MascotaModel.findOne({ _id: idMascota });
    const image = await cloudinary.uploader.upload(file.path);

    mascota.imagen = image.secure_url;
    await mascota.save();
    return {
      imageUrl: image.secure_url,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPetsAdminService,
  getAllPetsService,
  getPetService,
  createPetService,
  deletePetService,
  updatePetService,
  crearActualizarImg,
};
