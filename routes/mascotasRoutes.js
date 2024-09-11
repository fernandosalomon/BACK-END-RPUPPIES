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
router.get("/", getAllPetsController);

/* TRAE UNA MASCOTA */
router.get("/:idMascota", getPetController);

/* CREAR MASCOTA */
router.post("/", createPetController);

/* ACTUALIZAR */
router.put("/:idMascota", updatePetController);

/* ELIMINAR */
router.delete("/:idMascota", deletePetController);

module.exports = router;
