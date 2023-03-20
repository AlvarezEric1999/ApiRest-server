
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routePath = '/api/usuarios';
        
        
        // conectar db 
        this.conectarDB()
        
        // middleeares
        this.middlewares()

        // rutas de mi aplicacion
        this.routes();

    }

    async conectarDB(){
        dbConnection();
    }



    middlewares(){

        //cors 
        this.app.use(cors())


        // lectura y parseo
        this.app.use(express.json());


        // directorio publico 
        this.app.use(express.static('public'));


    }



    routes(){
        
        this.app.use(this.routePath, require('../routes/user'))


    }




    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo' , this.port);
        });
    }

}



module.exports = Server