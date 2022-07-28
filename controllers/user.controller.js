const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generarJWT } = require('../utils/jwt');



const index = async(req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.status(500).json(err);
    }
}


const store = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await User.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar user
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( user.id );


        res.json({
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


module.exports = {
    index,
    store,
}