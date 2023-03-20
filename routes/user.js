const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role')

const router = Router()



router.get('/',usuariosGet);

router.put('/:id',usuariosPut);

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('rol').custom(async(rol='')=>{
       const existeRol = await  Role.findOne({rol})
       if(!existeRol){
        throw new Error(`el rol ${rol} no esta registrado en la BD`)

       } 
    }),

    validarCampos
],usuariosPost);

router.delete('/',usuariosDelete);

router.patch('/',usuariosPatch);



module.exports = router;