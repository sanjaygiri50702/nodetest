var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/',function(req,res,next){
    connection.query('select * from category',function(error,results){
        if(error) throw error
        res.send(results);
    })
});

router.post('/',function(req,res,next){
    connection.query('insert into category set ?',req.body,function(err,results){
        if(err) throw err; 
        res.send(results); 

    })
})

router.delete('/:id',function(req,res,next){
    connection.query('delete from category where id = ?',req.params.id,function(err,results){
        if(err) throw err;
        results.message = "category deleted"
        res.send(results);
    })
})
module.exports= router;