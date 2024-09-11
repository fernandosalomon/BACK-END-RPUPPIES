const {
  getAllPetsService,
  getPetService,
  createPetService,
  updatePetService,
  deletePetService,
} = require("../services/mascotaService");


const getAllPetsController = async (req, res) => {
  const result = await getAllPetsService(req.params.idUsuario);
  if (result.statusCode === 200) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result.mensaje);
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
  const result = await createPetService(req.params.idUsuario, req.body);
  if (result.statusCode === 201) {
    res.status(201).json(result);
  } else {
    res.status(result.statusCode).json(result.mensaje);
  }
};

const updatePetController = async (req, res) => {
  const result = await updatePetService(
    req.params.idUsuario,
    req.params.idMascota,
    req.body
  );
  if (result.statusCode === 200) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result.mensaje);
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
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
};

