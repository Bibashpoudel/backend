import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.js';
import bcrypt from 'bcryptjs'



export const userRouter = express.Router()



userRouter.get('/createone', expressAsyncHandler(async(req, res)=>{
    await User.remove({});
    const user = new User({
        username:"admin",
        password:bcrypt.hashSync("Bibash7$$&&@@", 8)

    })
    const createUser = await user.save();
    res.send({createUser});
    
}))
userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({username:req.body.username});
    if(!user){
        res.status(401).send({message:'Invalid username'})

    }
    else{
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id:user._id,
                username:user.username,
            });
            return ;
        }
        else{
            res.status(401).send({message:"invalid password"})
        }
        
    }
}));