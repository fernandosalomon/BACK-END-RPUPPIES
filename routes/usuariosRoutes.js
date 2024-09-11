const {Router} = require(`express`);
const { registroUsuario, loginUsuario, obtenerTodosLosUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario, agregarOactualizarImgUsuario } = require("../controllers/usuariosController");
const multer = require("../middlewares/multer");

const router = Router();

router.post(`/`, registroUsuario);

router.post(`/login`, loginUsuario);

//agregar o actualizar imagen
router.post("/agregarImg/:idUsuario", multer.single("image"), agregarOactualizarImgUsuario)

router.get(`/`, obtenerTodosLosUsuarios);

router.get(`/:idUsuario`, obtenerUsuario);

router.put(`/:idUsuario`, actualizarUsuario);

router.delete(`/:idUsuario`, eliminarUsuario);

module.exports = router;