import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Blog from '../models/blog.js'

export const blogRouter = express.Router()


blogRouter.post('/addBlog', expressAsyncHandler(async(req,res)=>{
    const blog = new Blog({
        title: req.body.title,
        image:req.body.image,
        content:req.body.content,
    })
    const newBlog = await blog.save();
    if(newBlog){
        res.status(201).send({message:"your blog has been send for approval"})
    }
    res.status(500).send({message:"Something Wend wrong"})
}))

blogRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const blog = await Blog.find({isApproved: {$eq: true}});
    res.send(blog); 
}))
