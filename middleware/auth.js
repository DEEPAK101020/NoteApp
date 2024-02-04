const jwt=require("jsonwebtoken");


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(token){
        try{
            const decoded=jwt.verify(token,"masai")
            if(decoded){
                req.body.userID=decoded.userID;
                req.body.username=decoded.username;
                next();
            }
        }
        catch(err){

        }
    }

}
module.exports={
    auth,
}