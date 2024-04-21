const mongoose = require("mongoose");
const DB = process.env.DATABASE;

let dbConn;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    dbConn = mongoose.connection;
    console.log("Database connection successfull")
}).catch((err)=>{
    console.log("connection failed because: ",err)
})

const getdbConn = () => {
    if(!mongoose.connection.readyState){
        throw new Error("Database connection failed");
    }
    return dbConn;
};

 module.exports = getdbConn;