import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import UserBlog from '../models/userblog.js';
import { isAuth } from '../utils.js';

export const userBlogRouter = express.Router()
userBlogRouter.post('/postBlog', expressAsyncHandler(async(req, res)=>{
    const Blog = new UserBlog({
        fullname:req.body.fullname,
        email:req.email.email,
        blog:req.body.blog
    })
    const newBlog = await Blog.save()
    if(newBlog){
        return res.status(201).send(newBlog)
    }
    return res.send({messsage:"Somethings went wrong"})
}))

userBlogRouter.get('/',isAuth, expressAsyncHandler(async(req, res)=>{
    const data = await UserBlog.find()
    if(data){
        return res.status(200).send(data);
    }
}))