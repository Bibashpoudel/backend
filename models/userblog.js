import mongoose from 'mongoose'


const  UserBlogSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})
const UserBlog = mongoose.model("userBlog", UserBlogSchema)

export default UserBlog;