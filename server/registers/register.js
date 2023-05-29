const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const nameRule = /[^a-z]/gi;

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        dropDups: true
    },
    password : {
        type : String,
        required : true
    }
});


//throws validationError on duplicate values
userSchema.plugin(uniqueValidator);

userSchema.path("fname").validate((fname)=>{
    return !nameRule.test(fname); //return false for characters other than alphabets
},"First Name can be only in alphabets")

userSchema.path("lname").validate((lname)=>{
    return !nameRule.test(lname); //return false for characters other than alphabets
},"Last Name can be only in alphabets")

userSchema.path("email").validate((email)=>{
    const emailRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRule.test(email); //return false for characters other than alphabets
},"Correct your email")

const Uservar = mongoose.model("user",userSchema); //Myuser is actual document collection in our db (in db it'll stored as myusers (row name automatically become plural and all in smallcase))

module.exports = Uservar;