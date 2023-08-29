const { NoteModel } = require("../Model/notesModel");
const express = require("express");
const notesRouter = express.Router();
notesRouter.use(express.json());
const {auth}=require("../MiddleWare/auth.middleware")
 notesRouter.get("/",auth, async(req,res)=>{
       
      try{
        const notes=await NoteModel.find({"userId":req.body.userId})
        res.status(200).send(notes) 
      }catch(err){
        res.status(400).send(err)
      }     
 })

notesRouter.post("/add",auth, async(req,res)=>{
         try{
           const user=new NoteModel(req.body)
           await user.save()
           res.status(200).send({"msg":"New Notes added"})
         }catch(err){
          res.status(400).send(err)
         }
})
notesRouter.patch("/update/:id",auth,async(req,res)=>{
      const {id}=req.params;
      const payload=req.body
      if(id){
        try{
       await NoteModel.findByIdAndUpdate({_id:id},payload)
       res.send("update successfully")
        
        }catch(err){
         res.send(err)
        }
      }
})
notesRouter.delete("/delete/:id",auth,async(req,res)=>{
  const {id}=req.params;
    if(id){
      try{
     
       await NoteModel.findByIdAndDelete({_id:id})
       res.status(200).send({"msg":"Notes has been deleted "})
     }catch(err){
       res.status(400).send({"err":err})
      }
     }
    
})

module.exports = { notesRouter };
