const express = require ("express")
const app = express()

app.listen(3003 , ()=>{
    console.log(("server ok"));
})
require ('dotenv').config();
console.log(process.env.ENV_VAR_NAME);

const Server = require(`./server/server`);
const servidor = new Server();

servidor.listen();