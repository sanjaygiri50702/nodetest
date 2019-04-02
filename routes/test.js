var express = require('express');
var route = express.Router();
route.get('/',function(req,res,next){
    res.render('test',{tittle:'test',description:'this is my first test'})
});
module.exports = route;