const {Router} = require(`express`);
const { registroUsuario, loginUsuario, obtenerTodosLosUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } = require("../controllers/usuariosController");

const router = Router();

router.post(`/`, registroUsuario);

router.post(`/login`, loginUsuario);

router.get(`/`, obtenerTodosLosUsuarios);

router.get(`/:idUsuario`, obtenerUsuario);

router.put(`/:idUsuario`, actualizarUsuario);

router.delete(`/:idUsuario`, eliminarUsuario);

module.exports = router;