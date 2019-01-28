const mongoose = require('mongoose');
const mongoose_paginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

let rolValidate = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un ROL valido'
}

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true,'El nombre es necesario']
    },
    email:{
        type: String,
        unique: [true,'El email ya esta registrado'],
        required: [true, 'El email debe ser necesario'],
        
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    image:{
        type:String
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolValidate,
    },
    state:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){
    let u = this;
    let userObject = u.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator,{ message:
    '{PATH} debe de ser unico'
});
userSchema.plugin(mongoose_paginate)


module.exports= mongoose.model('user',userSchema);