const express = require('express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/conexion');


class Server{

    constructor(){
        this.app = express();  
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            promotion: '/api/promotions',
        }

        //Conectar a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //aceptar archivos de api-rest
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/'
        // }));
    }


    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.promotion, require('../routes/promotion.routes'));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }

}


module.exports = Server;