const express = require(`express`);
const multer = require("../middlewares/multer");
const {
  getAllPetsController,
  getPetController,
  createPetController,
  deletePetController,
  updatePetController,
  crearActualizarImgMascota,
  getAllPetsAdminController,
} = require("../controllers/mascotasController");

const router = express.Router();

/* TRAER TODOS */
router.get("/all/", getAllPetsAdminController);
router.get("/:idMascota", getPetController);
router.get("/", getAllPetsController);

/* CREAR MASCOTA */
router.post("/", createPetController);

// /* AGREGAR IMAGEN O ACTUALIZAR*/
// router.post("/imgMascota/:idMascota", multer.single('image'), crearActualizarImgMascota)

/* ACTUALIZAR */
router.put("/:idMascota", updatePetController);

/* ELIMINAR */
router.delete("/:idMascota", deletePetController);

module.exports = router;
