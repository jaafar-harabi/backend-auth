const express=require("express")
const app=express()
require('dotenv').config()
require('./config/connect')

const userRouter=require('./routes/user')


app.use(express.json())
app.use('/user',userRouter)



app.listen(process.env.PORT,()=>{console.log('connected to port');})