var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.render('vpp/index');
});

router.get('/charts', function(req, res) {
   res.render('vpp/charts');
});


module.exports = router;