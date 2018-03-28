const User = require('../models/model.user')
const token = require('../routes/middelware/auth')
const FB = require('fb');
const has = require('../routes/middelware/hash')
// const jwt = require('jsonwebtoken')

module.exports = {
    signIn (req, res){
        if (req.headers.access_token) {
            FB.api('me', { fields: ['name', 'email'], access_token: req.headers.access_token }, (data) => {
                if (data.error) return res.status(500).send({ message: data.error });
                
                User.findOne({ email: data.email }).then(userData=>{
                    if (userData) {
                        token.generate({id:userData._id,name:userData.name, name:userData.email}, (token) => {
                            res.status(200).json({
                                message: 'logged in',
                                data: token
                            })
                        })
                    }else{
                        User.create({
                            name: data.name,
                            email: data.email,
                        }).then(new_user=>{
                            token.generate({id:new_user._id,name:new_user.name, email:new_user.email}, (token) => {
                                res.status(200).json({
                                    message: 'signin success',
                                    data: token
                                })
                            })
                        }).catch(err=>{
                            res.send(err)
                        })
                    }
                }).catch(err=>{
                    res.send(err)
                })
            })
        }else {
            User.findOne({email : req.body.email}).then(dataUser=>{
                if(dataUser){
                    if(has.compare(req.body.password, dataUser.password)){    
                        token.generate({id:dataUser._id,name:dataUser.name, name:dataUser.email}, (token) => {
                            res.status(200).json({
                                message: 'logged in',
                                data: token
                            })
                        })
                        
                    }else{
                        res.status(404).json({
                            message: 'password is incorect'
                        })
                    }
                }else{
                    res.status(404).json({
                        message: 'email is incorect'
                    })
                }
            }).catch(err=>{
                res.send(err)
            })
        }
    }, 
    signUp (req, res){
        User.findOne({email : req.body.email}).then(datauser=>{
            if(datauser){
                res.send({
                    message:'email has been used'
                })
            }else{
                let user = new User(req.body)
                user.save().then(data=>{
                    res.send({
                        message : 'new user created',
                        data
                    })
                })
            }
        })
    }
}