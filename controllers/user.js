 
 const {response} = require('express')
 
 const usuariosGet = (req, res = response)=>{
    
    const query = req.query;
    
    res.json({
            ok:true,
            msg:'get-api-controller',
            query
        });
    }


 const usuariosPut = (req, res = response)=>{
    
    const { id }  = req.params
    
    res.json({
        ok:true,
        msg:'put-api-controller',
        id 
    });
}   


const usuariosPost = (req, res)=>{
    
    const {nombre ,edad} = req.body;

    res.json({
        msg:'post-api-controller',
        // body
        nombre,edad


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

