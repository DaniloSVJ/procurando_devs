const mongoose = require('mongoose')

const UserSchema = new moogoose.Shema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },
    password:{
        type: String,
        unique: true,
        require:true,
        lowercase: true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },


});

const User=moogoose.model('User',UserSchema);

module.exports=User;


