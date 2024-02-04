const express=require("express");
const app=express();
const {connection}=require("./db")
const cors=require("cors")




app.use(express.json());

const {useroute}=require("./routes/userroutes")
const {notesroute}=require("./routes/notesroutes")

app.use(cors())
//routes
app.use("/user",useroute)
app.use("/note",notesroute)




//connect

app.listen(5000,async(req,res)=>{
    try{
        await connection
        console.log("connected to db");
        console.log("serever running at 5000")
    }
    catch(err){
        console.log(err)
    }
})

