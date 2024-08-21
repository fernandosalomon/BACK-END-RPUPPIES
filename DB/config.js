const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT)
.then(() => console.log("CONEXION EXITOSA A BACK-END-CLI-VET-RC"))
.catch((error) => console.log("ERROR AL CONECTARSE A BACK-END-CLI-VET-RC", error));

module.exports = mongoose;