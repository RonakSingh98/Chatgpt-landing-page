const express  = require("express");
const cors = require("cors"); //used to allow cors
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Uservar = require("./registers/register.js");
require("./connect_db/connect_db.js");
// const JWT_KEY = process.env.JWT_KEY;
const JWT_KEY = "Ankur";

const server = express();
server.use(cors());
server.use(express.json());

server.post("/register", async (req,res)=>{
    // password validation
    const passRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
    try{
    const {fname,lname,password,email} = req.body;
    //if password validation failed return error
    // returns true if password contains : password length > 8,contain atleast one uppercase,lowercase,special character and digit
    if(!passRule.test(password)){
       return res.send({signupstatus:false,error: "Password length > 8,contain atleast one uppercase,lowercase,special character and digit"})
    }

    //encrypt and save password to database
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
            const payload = {user : {id : data._id}}
            loginstatus = true;
            const token = jwt.sign(payload,JWT_KEY);
            return res.send({fname : data.fname,loginstatus,token});
        }
    }
    return res.send({loginstatus});
})

server.post("/auth", async (req,res)=>{
    let loginstatus = false;
    const token = req.header("user-token");
    try{
        if(token){
            //verify token
            const validateToken = jwt.verify(token,JWT_KEY);
            const getUser = await Uservar.findById(validateToken.user.id);
            loginstatus = true;
            return res.status(200).send({loginstatus,name : getUser.fname});
        }
        return res.status(401).send({loginstatus});
    }
    catch(err){
        return res.status(500).send({loginstatus,err});
    }
})

const port = process.env.PORT || 5001;
server.listen(port,()=>{
    console.log("server started on port"+port);
})