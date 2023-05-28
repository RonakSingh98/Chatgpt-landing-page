const express  = require("express");
const cors = require("cors"); //used to allow cors
const bcrypt = require("bcryptjs");
const Uservar = require("./registers/register.js");
require("./connect_db/connect_db.js");

const server = express();
server.use(cors());
server.use(express.json());

server.post("/register", async (req,res)=>{
    try{
    const {fname,lname,password,email} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const storeData = {
        fname,lname,email,"password" : hashedPassword
    }
    const saveUser = new Uservar(storeData);
        await saveUser.save();
        return res.send({message: "registered",signupstatus:true});
    }
    catch(Error){
        try{
            let errorPath = Object.keys(Error.errors)[0];
            let message = Error["errors"][errorPath]["message"];
            return res.send({message: message,error: errorPath,signupstatus:false});
        }
        catch{
            return res.send(Error);
        }
    }
})

server.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    const data = await Uservar.findOne({email});
    let loginstatus = false;
    if(data){
        const comparePass = bcrypt.compareSync(password,data.password);
        if(comparePass){
            loginstatus = true;
            return res.send({fname : data.fname,loginstatus});
        }
    }
    return res.send({loginstatus});
})

const port = process.env.PORT || 5001;
server.listen(port,()=>{
    console.log("server started http://localhost:"+port);
})