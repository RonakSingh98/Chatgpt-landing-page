const mongoose = require("mongoose");
const main = async () => {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017",{
    autoIndex: true});
    console.log("Mongoose connected");
}
main().catch( e => console.log("Error Occured in mongoose "+e));