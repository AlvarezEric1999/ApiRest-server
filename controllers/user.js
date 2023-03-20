 
 const {response} = require('express')

 const bcryptjs = require('bcryptjs')

 const Usuario = require('../models/usuario');

 
 const usuariosGet = (req, res = response)=>{
    const {nombre,correo,password,rol }= req.body;
    const usuario = new Usuario({nombre,correo,password,rol})
    
    
    res.json({usuario});
    }


 const usuariosPut = (req, res = response)=>{
    
    const { id }  = req.params
    
    res.json({
        ok:true,
        msg:'put-api-controller',
        id 
    });
}   


const usuariosPost = async(req, res)=>{
    
   



    const {nombre,correo,password,rol }= req.body;
    const usuario = new Usuario({nombre,correo,password,rol})


    // verificar si el correo existe

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg:'el correo ya esta registrado'
        })
    }

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt)


    await usuario.save()

    res.json({
       
        // body
        usuario


    });
}


const usuariosDelete = (req, res)=>{
    res.json({
        ok:true,
        msg:'delete-api-controller'
    });
}


const usuariosPatch = (req, res)=>{
    res.json({
        ok:true,
        msg:'patch-api-controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}

