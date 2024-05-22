//THIS IS THE SERVER

const express=require('express')
const app=express()
const connectDb=require('./connect-db')
const router=require('./User/router')
app.use(express.json())


//Connect to DB
connectDb().then(()=>{
    console.log("Hello DB")
})

//Use the Routers
app.use('/',router)

//Start Server
const PORT =3000;
app.listen(PORT, ()=>{
    console.log('server is running at port:'+PORT);
})