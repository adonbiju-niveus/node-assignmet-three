const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        unique:true,
        required:true
    },
    emailId:{
        type:String,
        unique:true,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User = new mongoose.model('User',userSchema);
module.exports=User;