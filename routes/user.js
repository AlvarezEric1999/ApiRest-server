const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()



router.get('/',usuariosGet);

router.put('/:id',[
    check('id','no es un id  valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),

    validarCampos
],usuariosPut);




// 

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),

    validarCampos
],usuariosPost);

router.delete('/',usuariosDelete);

router.patch('/',usuariosPatch);



module.exports = router;