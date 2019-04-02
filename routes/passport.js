var express = require('express');
var app = express();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./db')

passport.serializeUser(function(user, done) {
    console.log("SERIALIZED DATA", user[0].id)
    done(null, user[0].id);
  });
  
passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = ?", id, (err,result,field)=>{
      done(err, result)
    })
  });

passport.use(new LocalStrategy({
    usernameField:`email`
},
  function(username, password, done) {
    connection.query('select * from users where email = ? and password = ?',[username,password],function(err,results,fields){
            if(err) return done(err)
            if(!results){
                return done(null,false,{message:'user not found'})
            }
        
            return done(null,results)
      })
    //   console.log(query.sql)

    
  } 
));

module.exports = passport;