require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();

app.use('/usuario',router);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



router.route('/')
.get((req,res)=>{
    res.json("get usuario");
})
.post((req,res)=>{
    res.json("post usuario");
})
.put((req,res)=>{
    res.json("put usuario")
})
.delete((req,res)=>{
    res.json("delete usuario");
});



app.post('/usuariox/:id',(req,res)=>{
    let body = req.body;

    if(body.name === undefined){
        res.status(400).json({ok:false,message:'El nombre es necesario'})
    }else{
        res.status(201).json({
            person:body
            })
    }

})

app.listen(process.env.PORT,()=>{
   console.log(`Running by ${process.env.PORT}`)
})