const expres=require("express");
const {auth}=require("../middleware/auth")
const {NotesModel}=require("../model/notesmodel")

// const NotesModel=NotesModel
const notesroute=expres.Router();

notesroute.use(auth)

//post
notesroute.post("/create",async(req,res)=>{
    const body=req.body;
    try{
        const newnotes=new NotesModel(req.body);
        await newnotes.save();
        res.status(200).json({message:"new notes added",newnotes});
    }catch(err){
        res.status(400).json({message:"failure!!!",err});
    }
})

//get

notesroute.get("/",async(req,res)=>{
    const bodyID=req.body.userID;
    // if(bodyID){
        const foundID=await NotesModel.find({userID:bodyID})
    // }else{
        res.status(200).json({message:"found id!!",foundID})
    // }
})

//update
notesroute.patch("/update/:updateid",async(req,res)=>{
    const update=req.params.updateid;
    // const {updateid}=req.params.updateid
    const notesfromid=await NotesModel.findById(update)
    // const notesfromid=await NotesModel.findOne({_id:update})
    if(notesfromid.userID===req.body.userID){

        const updatenote=await NotesModel.findByIdAndUpdate({_id:notesfromid._id},req.body);
        res.status(200).json({message:"update successfull"})
    }
    else{
        res.status(400).json({message:"not authorized!"})
    }

})

//delete
notesroute.delete("/delete/:deleteid",async(req,res)=>{
    const update=req.params.deleteid;
    // const {updateid}=req.params.updateid
    const notesfromid=await NotesModel.findById(update)
    // const notesfromid=await NotesModel.findOne({_id:update})
    if(notesfromid.userID===req.body.userID){

        const updatenote=await NotesModel.findByIdAndDelete({_id:notesfromid._id});
        res.status(200).json({message:"delete successfull"})
    }
    else{
        res.status(400).json({message:"not authorized!"})
    }
    
})

module.exports={
    notesroute,
}