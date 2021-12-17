import mongoose from 'mongoose'


const  CVSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    intrest:{
        type:String,
        required:true
    },
    cv:{
        type:File,
        required:true
    }
   
},
{
    timestamps:true
})
const CV = mongoose.model("Cv", CVSchema)

export default CV;