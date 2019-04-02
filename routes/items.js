var express = require('express');
var router = express.Router();
var connection = require('./db')

router.get('/',function(req,res,next){
    connection.query('select * from items', function (error, results, fields) {
        if (error) throw error;
        // connected!
        res.json(results);
      });
})


router.get('/:id',function(req,res,next){
    var id = req.params.id;
    connection.query('select * from `items` where `id` = ?',id, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
})


router.get('/status/:status',function(req,res,next){
    var status = req.params.status;
    connection.query('select * from `items` where `status` = ?',status, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})


router.get('/',function(req,res,next){
  connection.query('select * from items',function(error,results){
      if(error) throw error


      res.send(results);
  })
});


router.post('/',function(req,res,next){
  connection.query('insert into items set ?',req.body,function(err,results){
      if(err) throw err; 
      res.send(results); 

  })
})


router.delete('/:id',function(req,res,next){
  connection.query('delete from items where id = ?',req.params.id,function(err,results){
      if(err) throw err;
      
      results.message = "items deleted"
      res.send(results);
  })
})
module.exports = router; 