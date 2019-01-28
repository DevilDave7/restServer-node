require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/usuario', require('./routes/users'));


mongoose.connect(process.env.urlDB,(err,res)=>{
    if (err) throw colors.red(err);
    console.log('database running'.green)
})


app.listen(process.env.PORT,()=>{
   console.log(`Running by ${process.env.PORT}`)
})