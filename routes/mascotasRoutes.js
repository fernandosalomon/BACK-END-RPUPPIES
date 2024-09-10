const express = require(`express`);
const { obtenerTodasLasMascotas, obtenerMascota, crearMascota, actualizarMascota, eliminarMascota, getAllPetsController, getPetController } = require("../controllers/mascotasController");

const router = express.Router();

/* TRAER TODOS */
router.get("/:idUsuario", getAllPetsController);

/* TRAE UNA MASCOTA */
router.get("/:objIDUsuarioMascota", getPetController);

/* CREAR MASCOTA */
router.post("/:idUsuario", crearMascota);

/* ACTUALIZAR */
router.put("/:objIDUsuarioMascota", actualizarMascota);

/* ELIMINAR */
router.delete("/:objIDUsuarioMascota", eliminarMascota);

module.exports = router;