
const express = require('express')
const cors = require('cors')



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routePath = '/api/usuarios';
        
        // middleeares
        this.middlewares()

        // rutas de mi aplicacion
        this.routes();

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