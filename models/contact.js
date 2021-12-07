import mongoose from 'mongoose';


const ContactSchema = new mongoose.Schema({
    email:{
        type:String,require:true,
    },
    phone:{
        type:String, 
    },
    message:{
        type:String
    }
}
,{
    timestamps: true
})

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;