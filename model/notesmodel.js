const mongoose=require("mongoose");

const noteschema=mongoose.Schema({
    Title:String,
    body:String,
    userID:String,
    username:String
},{
    versionKey:false
})
const NotesModel=mongoose.model("notemodel",noteschema);

module.exports={
    NotesModel,
};