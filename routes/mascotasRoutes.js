const express = require(`express`);
const { obtenerTodasLasMascotas, obtenerMascota, crearMascota, actualizarMascota, eliminarMascota, crearActualizarImgMascota } = require("../controllers/mascotasController");
const multer = require("../middlewares/multer");
const router = express.Router();

/* TRAER TODOS */
router.get("/", obtenerTodasLasMascotas);

/* TRAE UNA MASCOTA */
router.get("/:idMascota", obtenerMascota);

/* CREAR MASCOTA */
router.post("/", crearMascota);

/* AGREGAR IMAGEN O ACTUALIZAR*/
router.post("/imgMascota/:idMascota", multer.single('image'), crearActualizarImgMascota)

/* ACTUALIZAR */
router.put("/:idMascota", actualizarMascota);

/* ELIMINAR */
router.delete("/:idMascota", eliminarMascota);

module.exports = router;