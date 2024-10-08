require(`../DB/config`);
const express = require(`express`);
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.rutas();
  }

  rutas() {
    this.app.use("/api/mascotas", require(`../routes/mascotasRoutes`));
    this.app.use(`/api/usuarios`, require(`../routes/usuariosRoutes`));
    this.app.use(`/api/turnos`, require(`../routes/turnosRoutes`));
  }

  middleware() {
    /* HABILITAMOS JSON */
    this.app.use(express.json());
    /* ARCHIVOS STATICOS */
    this.app.use(express.static(`./public`));
    this.app.use(cors());
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("Server OK", 3001);
    });
  }
}

module.exports = Server;
