const express = require(`express`);
const {getAllPetsController, getPetController, createPetController, deletePetController, updatePetController } = require("../controllers/mascotasController");

const router = express.Router();

/* TRAER TODOS */
router.get("/:idUsuario", getAllPetsController);

/* TRAE UNA MASCOTA */
router.get("/:objIDUsuarioMascota", getPetController);

/* CREAR MASCOTA */
router.post("/:idUsuario", createPetController);

/* ACTUALIZAR */
router.put("/:objIDUsuarioMascota", updatePetController);

/* ELIMINAR */
router.delete("/:objIDUsuarioMascota", deletePetController);

module.exports = router;