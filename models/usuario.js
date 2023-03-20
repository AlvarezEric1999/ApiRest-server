


const {Schema,model} = require('mongoose');




const UsuarioSchema = Schema({
    nombre:{
        type:String,
        require:[true,'el nombre es obligatorio'],
    },
    correo:{
        type:String,
        require:[true,'el correo es obligatorio'],
        unique:true
    },

    password:{
        type:String,
        required:[true,'la contraseña es obligatoria'],
        
    },
    img:{
        type:String,
    },

    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE'],
        },

    estado:{
        type:Boolean,
        default:true    
        },

    google:{
         type:Boolean,
         dafault:false

}

});


module.exports = model('Usuarios',UsuarioSchema);