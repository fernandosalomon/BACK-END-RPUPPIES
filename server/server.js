require(`../DB/config`);
const express = require(`express`);
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.rutas();
  }

  middleware() {
    /* HABILITAMOS JSON */
    this.app.use(express.json());
    /* ARCHIVOS STATICOS */
    this.app.use(express.static(`./public`));
    this.app.use(cors());
  }

  rutas() {
    this.app.use("/api/mascotas", require(`../routes/mascotasRoutes`));
    this.app.use(`/api/usuarios`, require(`../routes/usuariosRoutes`));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("Server OK", 3001);
    });
  }
}

module.exports = Server;
