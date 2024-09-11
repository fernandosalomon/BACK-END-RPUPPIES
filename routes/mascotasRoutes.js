const express = require(`express`);
const {
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
} = require("../controllers/mascotasController");

const router = express.Router();

/* TRAER TODOS */
router.get("/:idUsuario", getAllPetsController);

/* TRAE UNA MASCOTA */
router.get("/:idUsuario/:idMascota", getPetController);

/* CREAR MASCOTA */
router.post("/:idUsuario", createPetController);

/* ACTUALIZAR */
router.put("/:idUsuario/:idMascota", updatePetController);

/* ELIMINAR */
router.delete("/:idUsuario/:idMascota", deletePetController);

module.exports = router;
