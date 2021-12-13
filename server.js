import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import { blogRouter } from './routers/blogRouter.js';
import { contactRouter } from './routers/contactRouter.js';
import { userRouter } from './routers/userRouter.js';


const app = express();
app.use(cors())
app.use(express.json()); ////middleware
app.use(express.urlencoded({ extended :false })); ///middleware

const DB = 'mongodb+srv://techfortress:techfortressAdmin$$@cluster0.iaxsi.mongodb.net/techfortress?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology : true,
    // useFindAndModify : false
}).then(()=> {
    console.log("connection successfull")
}).catch((err)=> console.log(err))


app.use('/api/message', contactRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
app.get('/',(req,res)=>{
    res.send("hello world");
})


//error cather middlerware
app.use((err, req, res, next) =>{
    res.status(500).send({message:err.message})
})


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})