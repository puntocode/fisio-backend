/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { index, store } = require('../controllers/user.controller');
// const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', index );

router.post( '/', store );


module.exports = router;