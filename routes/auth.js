var express = require('express');
var router = express.Router();
var connection = require('./db');
var passport = require('./passport')
var { check,validationResult } = require('express-validator/check');

router.get('/login',(req,res,next)=>{
    res.render('form')
})
router.get('/register',(req,res,next)=>{
    res.render('register');
})
router.post('/auth/login',passport.authenticate('local'),(req,res,next)=>{
    res.redirect('/dashboard')
})
router.get('/dashboard',(req,res,next)=>{
    // res.json(req.user)
    if(!req.isAuthenticated()){
        res.redirect('/')
    }
    
    res.render('dashboard',{email:req.user[0].email})
})
router.get('/logout',(req,res,next)=>{
    req.logOut();
    // res.clearCookie("connect.sid");
    res.redirect('/')
})

router.post('/register',[
    check('email').isLength({min:3,max:50}).withMessage('email length is less than 3 or greater than 50'),
    check('email').isEmail().withMessage('invalid email'),
    check('password').isLength({min:8}).withMessage('password length is less than 8')
  ],function(req,res,next){
    const error = validationResult(req)
    if(!error.isEmpty()){
      return res.status(400).send(error.array())
    }
    // const key = crypto.pbkdf2Sync(`${req.body.password}`, 'salt', 1000, 64, 'sha512');
    // return res.json({password:key.toString('hex')})
    // req.body.password= key.toString('hex');
    connection.query('insert into users set ?',{email:req.body.email,password:req.body.password},function(err,results){
        if(err) throw err; 
            res.redirect('/login')

  
    })  
  })
  
module.exports = router;