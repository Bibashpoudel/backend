import multer from 'multer'
import express from 'express'

const uploadRouter = express.Router()


const storage = multer.diskStorage({
    destination(req, file , cb)
    {
        cb(null, 'uploads/')
    },
    
        filename(req, file, cb){
            cb(null, `${Date.now()}.pdf`)
        }
    
})

const upload = multer({ storage });


    uploadRouter.post('/', upload.single('file'), (req, res)=>{
        res.send(`/${req.file.path}`)
    })


export default uploadRouter