const {connection}=require("./db")
const { notesRouter}=require("./Routes/notes.router")
const { userRoute}=require("./Routes/users.router")
const express=require("express")
const {auth}=require("./MiddleWare/auth.middleware")
const app=express()
const cors = require("cors");
app.use(cors());
app.use("/users",userRoute)
app.use("/notes",notesRouter)

app.listen(8080,async()=>{
     try{
     await connection
         console.log("connected")
     }catch(err){
       res.status(400).send({"err":{err}})
     }
     
})