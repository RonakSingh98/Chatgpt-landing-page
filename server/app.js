const express  = require("express");
const cors = require("cors"); //used to allow cors
const bodyParser = require("body-parser"); //used to read request body
const Uservar = require("./registers/register.js");
require("./connect_db/connect_db.js");

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.get("/v1/get",(req,res)=>{
    res.send("Hello")
})
server.post("/register", async (req,res)=>{
    const saveUser = new Uservar();
    saveUser.fname = req.body.fname;
    saveUser.lname = req.body.lname;
    saveUser.password = req.body.password;
    saveUser.email = req.body.email;
    try{
        await saveUser.save();
        res.send({message: "registered",signupstatus:true});
    }
    catch(Error){
        try{
            let errorPath = Object.keys(Error.errors)[0];
            let message = Error["errors"][errorPath]["message"];
            res.send({message: message,error: errorPath,signupstatus:false});
        }
        catch{
            res.send(Error);
        }
    }
})

server.post("/login", async (req,res)=>{
    const data = await Uservar.findOne({email : req.body.email,password : req.body.password});
    let loginstatus = false;
    if(data == null){
        res.send({loginstatus});
    }
    else{
        loginstatus = true;
        res.send({fname : data.fname,loginstatus});
    }
})

const port = process.env.PORT || 5001;
server.listen(port,()=>{
    console.log("server started http://localhost:"+port);
})