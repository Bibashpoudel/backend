import mongoose from 'mongoose';


export const BlogSchema = new mongoose.Schema({
    title:{
        type:String, required:true
    },
    image:{
        type:String, required:true
    },
    content:{
        type:String, required:true,
    },
    isApproved:{
        type:Boolean, default:false
    }
}
,{
    timestamps: true
}
)
const Blog = mongoose.model('Blog',BlogSchema);
export default Blog;