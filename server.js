import express from 'express';
import mongoose from 'mongoose';
import { blogRouter } from './routers/blogRouter.js';
import { contactRouter } from './routers/contactRouter.js';
import { userRouter } from './routers/userRouter.js';



const app = express();
app.use(express.json()); ////middleware
app.use(express.urlencoded({ extended :false })); ///middleware



mongoose.connect(process.env.MONGODB_URL ||'mongodb+srv://techfortress:techfortress@cluster0.pff17.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, //to get ride from duplicate waring
    useUnifiedTopology: true,
    

})


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


const port = 5000
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})