const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/recdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connect db success`)
}).catch((e)=>{
    console.log("no connection")
})
