const {
  getAllPetsAdminService,
  getAllPetsService,
  getPetService,
  createPetService,
  updatePetService,
  deletePetService,
} = require("../services/mascotaService");
const jwt = require(`jsonwebtoken`);

const getAllPetsAdminController = async (req, res) => {
  const allPets = await getAllPetsAdminService();
  if (allPets.mascotas.lenght === 0) {
    res.status(200).json({ mensaje: "No hay mascotas para mostrar" });
  } else {
    if (allPets.statusCode === 200) {
      res.status(200).json(allPets.mascotas);
    } else {
      res.status(allPets.statusCode).json(allPets.mensaje);
    }
  }
};

const getAllPetsController = async (req, res) => {
  if (!req.headers.auth) {
    res.status(401).json({ mensaje: "Usuario no autorizado" });
  } else {
    const idUsuario = jwt.verify(req.headers.auth, process.env.JWT_SECRET)._id;
    const result = await getAllPetsService(idUsuario);
    if (result.statusCode === 200) {
      res.status(200).json(result.mascotas);
    } else {
      res.status(result.statusCode).json(result.mensaje);
    }
  }
};

const getPetController = async (req, res) => {
  const result = await getPetService(
    req.params.idUsuario,
    req.params.idMascota
  );
  if (result.statusCode === 200) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result);
  }
};

const createPetController = async (req, res) => {
  if (!req.headers.auth) {
    res.status(401).json({ mensaje: "Usuario no autorizado" });
  } else {
    const idUsuario = jwt.verify(req.headers.auth, process.env.JWT_SECRET)._id;
    const result = await createPetService(idUsuario, req.body);
    if (result.statusCode === 201) {
      res.status(201).json(result);
    } else {
      res.status(result.statusCode).json(result.mensaje);
    }
  }
};

const updatePetController = async (req, res) => {
  if (!req.headers.auth) {
    res.status(401).json({ mensaje: "Usuario no autorizado" });
  } else {
    const idUsuario = jwt.verify(req.headers.auth, process.env.JWT_SECRET)._id;
    const result = await updatePetService(
      idUsuario,
      req.params.idMascota,
      req.body
    );
    if (result.statusCode === 200) {
      res.status(200).json(result);
    } else {
      res.status(result.statusCode).json(result.mensaje);
    }
  }
};

const deletePetController = async (req, res) => {
  const result = await deletePetService(
    req.params.idUsuario,
    req.params.idMascota
  );
  if (result.statusCode === 200) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result.mensaje);
  }
};

module.exports = {
  getAllPetsAdminController,
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
};
