const UsuarioModel = require("../models/usuarioModel");
const usuarioService = require(`../services/usuarioService`);


//REGISTRO USUARIO
const registroUsuario = async (req, res) => {
  try {
    const resultado = await usuarioService.crear(req.body);

    if (resultado.mensaje) {
      res.status(404).json(resultado.mensaje);
    } else {
      res.status(201).json(resultado);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//LOGIN USUARIO
const loginUsuario = async (req, res) => {
  try {
    const resultado = await usuarioService.login(req.body);
    if (resultado.statusCode === 400) {
      res.status(400).json(resultado);
    } else {
      res.status(200).json(resultado);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET DE TODOS
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET USUARIO POR ID
const obtenerUsuario = async (req, res) => {
  try {
    resultado = await usuarioService.obtenerUsuarioPorID(req.params.idUsuario);
    if (resultado) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//UPDATE USUARIO
const actualizarUsuario = async (req, res) => {
  try {
    const resultado = await usuarioService.actualizar(
      req.params.idUsuario,
      req.body
    );
    if (resultado.mensaje) {
      res.status(404).json(resultado.mensaje);
    } else {
      res.status(200).json(resultado);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//DELETE USUARIO
const eliminarUsuario = async (req, res) => {
  try {
    const resultado = await usuarioService.eliminar(req.params.idUsuario);
    if (resultado.mensaje) {
      res.status(200).json(resultado.mensaje);
    } else {
      res.status(404).json(resultado.mensajeError);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//RECUPERAR CONTRASEÑA
const resetPasswordController = async (req, res) => {
  try {
    const result = await usuarioService.resetPasswordService(req.params.token);
    if (result.is_verify) {
      res.status(200).json({ userID: result.userID });
    } else {
      res.status(401).json({ msg: "Usuario no autorizado" });

// AGREGAR O ACTUALIZAR IMAGEN

const agregarOactualizarImgUsuario = async (req, res) =>{
    console.log(req.body);
    try {
        const result = await usuarioService.agregarOactualizarImg(req.file, req.params.idUsuario)

        if(result.statusCode === 200){
            res.status(200).json({msg: "imagen cargada con exito"})
        }
    } catch (error) {
        console.log(error);

    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registroUsuario,
  loginUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  agregarOactualizarImgUsuario
};


