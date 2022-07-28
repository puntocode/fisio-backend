const { Router } = require('express');
const { index, store, update } = require('../controllers/promotion.controllers');
const upload = require('../utils/multer');



const router = Router();

/**
 * {{url}}/api/users
 */


//obtener todas las promociones - publico
router.get('/', index);

// Crear una promocion 
router.post('/', upload.single('image'), store);

router.put('/update', update);


module.exports = router;
