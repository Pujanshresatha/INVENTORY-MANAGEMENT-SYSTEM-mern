const {defult:mongoose}= require("mongoose");
const { PUBLIC_DATA } = require("../constant");
exports.ConnectDB = async()=>{
    try{
      await mongoose.connect(PUBLIC_DATA.mongo_url)
      console.log('the appis connect with ${mongoose.connection.host}');
    }catch(error){
        mongoose.dissconnect();
        process.exit(1)
    }
}