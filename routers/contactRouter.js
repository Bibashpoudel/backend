import express from 'express';

import expressAsynchandler from 'express-async-handler'

import Contact from '../models/contact.js'


export const contactRouter = express.Router();



//send message request 

contactRouter.post('/', expressAsynchandler(async (req,res)=>{
    const contact = new Contact({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    })
    const newContact = await contact.save();
    if(newContact){
        return res.status(201).send(contact);
    }
    return res.status(500).send({messsage:"Somethings went wrong"})
}) )
