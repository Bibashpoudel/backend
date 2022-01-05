import mongoose from 'mongoose'


const  CVSchema = new mongoose.Schema({
    fullname:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    intrest:{
        type:String,
       
    },
    cv:{
        type:String,
       
    }
   
},
{
    timestamps:true
})
const CV = mongoose.model("Cv", CVSchema)

export default CV;