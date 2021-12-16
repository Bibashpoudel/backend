import mongoose from 'mongoose'


const  UserBlogSchema = new mongoose.Schema({
    Fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   
    blog:{
        type:File,
        required:true
    }
   
},
{
    timestamps:true
})
const UserBlog = mongoose.model("userBlog", UserBlogSchema)

export default UserBlog;