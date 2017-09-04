var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');
var seccionesDb=db.get("secciones");
console.log('entrando secciones ...');
seccionesDb.find({}).then((docs) => {
  console.log(docs[0].titulo);
});


/* GET admin page. */
router.get('/', function(req, res, next) {
  seccionesDb.find({},{sort:{"_id" : 1}}).then((docs) => {
        res.render('secciones',{
        "secciones": docs
        });
    });
});
router.get('/:id', function(req, res, next) {
  console.log("manejo de post dentro de secciones:");
  console.log(req.params.id);
  var seccion=new Object();
  seccion._id=parseInt(req.params.id);
  console.log(seccion);
  
  seccionesDb.findOne(seccion).then((docs) => {
        console.log("antes de post ");
        console.log(docs);
        res.render('post',{
        "secciones": docs
        });
    });
});
module.exports = router;