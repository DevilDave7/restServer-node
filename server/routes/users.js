const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const _ = require('underscore');
const validParams = ['name','email','image','role','status','password'];

const router = express.Router();

router.route('/')
.get((req,res)=>{
   /* User.paginate({},{page:req.query.page||1,limit:8, sort: {'_id': -1} })
    .then(docs => res.json(docs))
    .catch(err=> res.status(400).json({
        ok:false,
        error:err})) */
        let page = Number(req.query.page || 1);
        let limit = Number(req.query.limit || 4);
        if(page > 0){
            page = (page-1)*limit;
        }
        
    User.find({state:true},'name email role state google img')
    .skip(page)
    .limit(limit)
        .exec((err, users)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    error:err
                })
            }
            User.count({state:true},(err,count)=>{
                if (err){
                    return res.status(400).json({
                        ok:false,
                        error:err
                    })
                }
                let all = count/limit;
                if(all % 1 != 0){
                    all=Math.floor(all)+1;
                }
                res.json({
                    users,
                    page:`${req.query.page} / ${all}`,
                    count
                })
                
            })
        })
})
.post((req,res)=>{
    let body = req.body;
    let usuario = new User({
        name : body.name,
        email : body.email,
        password: bcrypt.hashSync(body.password ,10),
        role: body.role

    });

   // usuarioDB.password = "*******"

    usuario.save((err,usuarioDB)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok : true,
            usuario:usuarioDB
        })
    })
});

router.route('/delete/:id')
    .delete((req,res)=>{
        User.findByIdAndDelete(req.params.id, (err,del)=>{
            if(err){
                res.status(400).json({
                    ok:false,
                    err
                })
            }
            if(!del){
                res.status(400).json({
                    ok:false,
                    error:{
                        message:'User not found'
                    }
                })
            }
    
            res.json({
                ok:true,
                user:del
            })
            
        })
    });

router.route('/:id')
.get((req,res)=>{
    User.findById(req.params.id,(err,doc)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }
        if(!doc){
            res.status(400).json({
                ok:false,
                message:'No se encontro el usuario',
                err            
            })
        }
        res.json({
            ok:true,
            person:doc
        })
    })
})
.put((req,res)=>{
    let body = _.pick(req.body, validParams);
    body.password = bcrypt.hashSync(body.password,10);

    User.findByIdAndUpdate(req.params.id,body,{new:true, runValidators:true},(err,response)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            person: response
        })
    })
})
.delete((req,res)=>{

    User.findByIdAndUpdate(req.params.id,{state:false},{new:true},(err,doc)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err,

            })
        }
        if(!doc){
            res.status(404).json({
                ok:false,
                err:{
                    message:'not found'
                }
            })
        }else{
            res.json({
                ok:true,
                person:doc
            })
        }
        
    }).catch(err=>res.status(500).json({ok:false,err}))
});

module.exports = router;