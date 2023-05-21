const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
  
    email:{
        type:String,
        unique:true,
        require:true
       
    },
    password:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('auth',userSchema)