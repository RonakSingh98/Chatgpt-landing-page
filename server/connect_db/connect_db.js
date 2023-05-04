const mongoose = require("mongoose");
const main = async () => {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://vercel:WIJIUcHU8X7BQPLc@live-project-01-cluster.on56otu.mongodb.net/?retryWrites=true&w=majority",{
    autoIndex: true});
    console.log("Mongoose connected");
}
main().catch( e => console.log("Error Occured in mongoose "+e));