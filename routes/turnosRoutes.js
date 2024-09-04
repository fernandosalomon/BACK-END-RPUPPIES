const express = require(`express`);
const {obtenerTodosLosTurnos, obtenerTurno, agregarTurno, editarTurno, eliminarTurno} = require(`../controllers/turnosController`)
const router = express.Router();

router.get("/", obtenerTodosLosTurnos);

router.get("/:idTurno", obtenerTurno);

router.post("/", agregarTurno);

router.put("/", editarTurno);

router.delete("/", eliminarTurno);

module.exports = router;