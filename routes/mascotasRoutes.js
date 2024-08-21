const express = require(`express`);
const { obtenerTodasLasMascotas, obtenerMascota, crearMascota, actualizarMascota, eliminarMascota } = require("../controllers/mascotasController");
const router = express.Router();

/* TRAER TODOS */
router.get("/", obtenerTodasLasMascotas);

/* TRAE UNA MASCOTA */
router.get("/:idMascota", obtenerMascota);

/* CREAR MASCOTA */
router.post("/", crearMascota);

/* ACTUALIZAR */
router.put("/:idMascota", actualizarMascota);

/* ELIMINAR */
router.delete("/:idMascota", eliminarMascota);

module.exports = router;