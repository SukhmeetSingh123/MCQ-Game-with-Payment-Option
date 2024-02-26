const mongoose=require("mongoose");

connectToMongoose().catch(err => console.log(err));

async function connectToMongoose(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Nexiara')
}

module.exports =connectToMongoose;