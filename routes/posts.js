var express = require('express');
var connection = require('./db');

var router = express.Router();
router.get('/',function(req,res,next){
    // console.log(req.query)
    connection.query('select * from posts',function(error,results){
        if(error) throw error;

        res.send(results);
    })
    // res.send('welcome to posts');
});
router.get('/:id',function(req,res,next){
    var id = req.params.id;
    connection.query('select * from `posts` where `id` = ?',id, function (error, results, fields) {
        if (error) throw error;
        const { id,title,description }= results[0];
        res.json({id,
          title,
          description
        });
      }); 
  })
  

router.post('/',function(req,res,next){
    connection.query('insert into posts set ?',req.body,function(err,results){
        if(err) throw err; 
        res.send(results); 

    })
})

router.delete('/:id',function(req,res,next){
    connection.query('delete from posts where id = ?',req.params.id,function(err,results){
        if(err) throw err;
        results.message = "posts deleted"
        res.send(results);
    })
})
router.put('/:id',function(req,res,next){
    connection.query('update posts set ? where id=?',[{...req.body},req.params.id],function(err,results){
        if(err) throw err;
        res.send(results)
    })
    // console.log(query.sql);
})
module.exports= router; 