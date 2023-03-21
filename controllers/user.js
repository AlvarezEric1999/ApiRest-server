// IMPORTACIONES DE PAQUETES 
 const {request,response} = require('express')
 const bcryptjs = require('bcryptjs')

 // 
 const Usuario = require('../models/usuario');
//  


// 
 const usuariosGet = async(req= request, res = response)=>{


    const { limite = 5,desde = 0 } = req.query;
    const estado = {estado: true}

    // const usuarios = await Usuario.find(estado)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(estado)    


    const [total, usuarios]= await Promise.all([
        await Usuario.countDocuments(estado),

        Usuario.find(estado)
        .skip(Number(desde))
        .limit(Number(limite))

        
    ]);


    res.json({

        // resp
        total,
        usuarios

    })
    ;

}



 

 const usuariosPut = async(req, res = response)=>{
    const { id }  = req.params
    const { _id ,password,google,correo,...resto} = req.body;
    // TODO validar base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt)

    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        usuario
    });
}   



// 
const usuariosPost = async(req, res)=>{ 
    const {nombre,correo,password,rol,img,google}= req.body;
    const usuario = new Usuario({nombre,correo,password,rol,google,img })
    // verificar si el correo existe
    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt)

    await usuario.save()
    res.json({usuario});
}



const usuariosDelete = (req, res)=>{
    res.json({
        ok:true,
        msg:'delete-api-controller'
    });
}



// 
const usuariosPatch = (req, res)=>{
    res.json({
        ok:true,
        msg:'patch-api-controller'
    });
}

// EXPORTACIONES DE MODULOS

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}

