const {
  getAllPetsService,
  getPetService,
  createPetService,
  updatePetService,
  deletePetService,
} = require("../services/mascotaService");
const jwt = require(`jsonwebtoken`);

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
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
};
