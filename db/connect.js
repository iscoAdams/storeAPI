import  Mongoose  from "mongoose";
export default (url)=> {
    Mongoose.connect(url, {
        
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
}