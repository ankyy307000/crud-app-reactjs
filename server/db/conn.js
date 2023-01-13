const mongoose = require("mongoose");

const DB= "mongodb+srv://ankyy:ankyy123@cluster0.7yqedz5.mongodb.net/mernstack?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);

mongoose.connect(DB,{
    UseNewUrlParser:true,
    UseUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));