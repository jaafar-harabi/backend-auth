const User=require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


const register= async(req,res)=>{
    try{
        const {username,email,password}=req.body
        usernameCheck=await User.findOne({username})
        emailCheck=await User.findOne({email})
        
        if(emailCheck){
            return res.send('inavlid email !')
        }
        if(usernameCheck){
            return res.send('inavlid username !')
        }
        newUser = new User(req.body)
        newUser.password=bcrypt.hashSync(password,10)
        savedUser=await newUser.save()
        res.send(savedUser)

    }catch(err){
        res.send(err)
    }
}

const login= async(req,res)=>{
    try{
        const {username,password}=req.body
        user=await User.findOne({username})
        if(!user){
            return res.send('email or password wrong !')
        }
        passwordCheck=bcrypt.compareSync(password,user.password)
        if(!passwordCheck){
            return res.send('email or password wrong !')
        }
        payload={
            username:user.username,
            _id:user._id
        }
        token=jwt.sign(payload,process.env.SECRET_KEY)
        res.send({mytoken:token})

    }catch(err){
        res.send(err)
    }
}











module.exports={register,login}