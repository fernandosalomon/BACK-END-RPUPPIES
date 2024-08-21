require(`../DB/config`);
const express = require(`express`);

class Server{
    constructor(){
        this.app = express();
        this.middleware();
        this.rutas();
    }

    middleware(){
        /* HABILITAMOS JSON */
        this.app.use(express.json());
        /* ARCHIVOS STATICOS */
        this.app.use(express.static(`./public`));
    }

    rutas(){
        this.app.use("/api/mascotas", require(`../routes/mascotasRoutes`));
        this.app.use(`/api/usuarios`, require(`../routes/usuariosRoutes`));
    }

    listen(){
        this.app.listen(3001, () =>{
            console.log("Server OK", 3001);
        });
    }
}

module.exports = Server;