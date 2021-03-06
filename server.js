
import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path'
import { blogRouter } from './routers/blogRouter.js';
import { contactRouter } from './routers/contactRouter.js';
import { userRouter } from './routers/userRouter.js';
import { userBlogRouter } from './routers/userBlogRouter.js';
import uploadRouter from './routers/UploadRouter.js';
import { CVRouter } from './routers/cvRouter.js';
import dotenv  from 'dotenv'

dotenv.config()

var corsOptions = {
  origin: "http://chitwan.herokuapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var app = express();
app.use(cors(corsOptions));

app.use(express.json()); ////middleware
app.use(express.urlencoded({ extended: false })); ///middleware

const DB = process.env.MONGO_DB_URL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify : false

}).then(()=> {
    console.log("connection successfull")
}).catch((err)=> console.log(err))

app.use('/api/cv', CVRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/message', contactRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/userblog', userBlogRouter)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.get('/',(req,res)=>{
    res.send("hello world");
})

// "/api/message", contactRouter);
// app.use("/api/blog", blogRouter);
// app.use("/api/user", userRouter);
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
// >>>>>>> 48ee464a55434ab854df63faf8401185c1c84ba4

// //error cather middlerware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
