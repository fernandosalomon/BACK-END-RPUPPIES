const express = require(`express`);
const multer = require("../middlewares/multer");
const {
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
  crearActualizarImgMascota,
} = require("../controllers/mascotasController");

const router = express.Router();

/* TRAER TODOS */
router.get("/:idUsuario", getAllPetsController);

/* TRAE UNA MASCOTA */
router.get("/:idUsuario/:idMascota", getPetController);

/* CREAR MASCOTA */
router.post("/:idUsuario", createPetController);

/* AGREGAR IMAGEN O ACTUALIZAR*/
router.post("/imgMascota/:idMascota", multer.single('image'), crearActualizarImgMascota)

/* ACTUALIZAR */
router.put("/:idUsuario/:idMascota", updatePetController);

/* ELIMINAR */
router.delete("/:idUsuario/:idMascota", deletePetController);

module.exports = router;
