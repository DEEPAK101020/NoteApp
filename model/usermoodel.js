const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    username:String,
    email:String,
    pass:String

},{
    versionKey:false
})
const UserModel=mongoose.model("usermodel",userschema);

module.exports={
    UserModel,
};