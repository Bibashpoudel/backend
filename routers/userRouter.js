import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.js';
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../utils.js';



export const userRouter = express.Router()

userRouter.get('/', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.find()
    return res.send(user)
}))

userRouter.get('/createone', expressAsyncHandler(async(req, res)=>{
    await User.remove({});
    try {
        const user = new User({
            username:"admin",
            email:"email",
            password:bcrypt.hashSync("Bibash7$$&&@@", 8)
    
        })
        const createUser = await user.save();
       if(createUser){
        res.send({
            id:createUser.id,
            username:createUser.username,
            email:createUser.email,
            token:generateToken(createUser)
        })
       }
    } catch (error) {
        res.send(error)
    }
    
}))
userRouter.post('/add',isAuth,  expressAsyncHandler( async(req,res)=>{
      
        const password = req.body.password;
        const haspassword = bcrypt.hashSync(password,8)
       
            try {
                User.create({
                    username:req.body.username,
                    email:req.body.email,
                    password:haspassword
                })
                    .then(data => {
                        res.send({
                            id:data.id,
                            username:data.username,
                            email:data.email,
                            token:generateToken(data)
                        })
                    })
                    .catch(err => {
                    res.status(500).send({
                        message:
                        "Some error occurred while creating the Tutorial."
                    });
                });

            } catch (error) {
                res.send({messg:"bibash error"})
                
            }
}))

userRouter.post('/signin', async(req, res)=>{
    const user = await User.findOne({where: {email:req.body.email}})

    if (user){
       if(bcrypt.compareSync(req.body.password, user.password)){
           res.send({
               id:user.id,
               username:user.username,
               email:user.phone,
               token:generateToken(user),
           });
           return;
       }
       else{
        res.status(401).send({message:"Incorrect password "})
       }
    }
    else{
        res.status(401).send({message:"user does not exist"})
    }
} )