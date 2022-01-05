import express from "express"
import expressAsyncHandler from "express-async-handler"
import CV from "../models/cv.js"
import { isAuth } from "../utils.js"




export const CVRouter = express.Router()


CVRouter.post('/send', expressAsyncHandler(async(req, res)=>{
    try {
        const cv = new CV({
            fullname:req.body.fullname,
            email:req.body.email,
            interest:req.body.interest,
            cv:req.body.cv
        })
    
        const newCv = await cv.save()
    
        if(newCv){
            return res.status(201).send({message:"CV send "})
        }
        
    } catch (error) {
        return res.send({messsage:error})
    }
   
}))

CVRouter.get('/', isAuth, expressAsyncHandler(async(req, res) =>{
    const cv = await CV.find() 
    res.status(200).send(cv)
}))