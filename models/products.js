import  Mongoose  from 'mongoose';
const schema = Mongoose.Schema;
const productschema = new schema({
    name : {
        type : String,
        required : [true,"name is required"],
    },
    price: {
        type :Number,
        required : [true,"price is required"],
    },
    featured: {
        type : Boolean,
        default:false,
    },
    rating: {
            type : Number,
            min : 1,
            default : 4.5,
    },
    // category: {
    //     type:String,
    //     required : [true,"category is required"],
    // },
    company: {
        type:String,
        required : [true,"company is required"],
        enum:{
            values: ['ikea','intel','nestla','marcos'],
            message: 'company is not supported'
        }
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
})
export default Mongoose.model("products", productschema);