var express = require('express');
var router = express.Router();
var connection = require('./db');
var { check,validationResult } = require('express-validator/check');
var crypto  = require('crypto');
var passport = require('./passport')


router.get('/',function(req,res,next){
  connection.query('select * from users',function(error,results){
      if(error) throw error
      res.send(results);
  })
});



router.post('/register',[
  check('email').isLength({min:3,max:20}).withMessage('email length is less than 3 or greater than 20'),
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
  connection.query('insert into users set ?',req.body,function(err,results){
      if(err) throw err; 
      req.session.userid = results.insertId
      res.redirect(301,'/session');

  })  
})

router.delete('/:id',function(req,res,next){
  connection.query('delete from users where id = ?',req.params.id,function(err,results){
      if(err) throw err;
      results.message = "users deleted";
      res.send(results);
  })
})
router.put('/:id',function(req,res,next){
  connection.query('update users set ? where id=?',[{...req.body},req.params.id],function(err,results){
      if(err) throw err;
      res.send(results)
  })
  // console.log(query.sql);
})
router.get('/login',function(req,res,next){
  // res.render('form')
  res.send(req.user)
})

router.post('/login',passport.authenticate('local'),function(req,res,next){
    res.send(req.user)
});


module.exports = router;
