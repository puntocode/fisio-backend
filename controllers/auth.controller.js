const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generarJWT } = require('../utils/jwt');
// const { googleVerify } = require('../helpers/google-verify');



const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(404).json({msg: 'Email no encontrado'});
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({ msg: 'Contraseña no válida' });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( user.id );
        res.json({user, token})

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }

}

// const googleSignIn = async( req, res = response ) => {

//     const googleToken = req.body.token;

//     try {

//         const { name, email, picture } = await googleVerify( googleToken );

//         const usuarioDB = await Usuario.findOne({ email });
//         let usuario;

//         if ( !usuarioDB ) {
//             // si no existe el usuario
//             usuario = new Usuario({
//                 nombre: name,
//                 email,
//                 password: '@@@',
//                 img: picture,
//                 google: true
//             });
//         } else {
//             // existe usuario
//             usuario = usuarioDB;
//             usuario.google = true;
//         }

//         // Guardar en DB
//         await usuario.save();

//         // Generar el TOKEN - JWT
//         const token = await generarJWT( usuario.id );
        
//         res.json({
//             ok: true,
//             token
//         });

//     } catch (error) {
        
//         res.status(401).json({
//             ok: false,
//             msg: 'Token no es correcto',
//         });
//     }

// }


const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT( uid );
    res.json({ token });
}

module.exports = { login, renewToken }
