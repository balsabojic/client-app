var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/', function(req, res) {
   res.render('vpp/index', {address : client.getNodeServerAddress()});
});

router.get('/charts', function(req, res) {
   res.render('vpp/charts', {address : client.getNodeServerAddress()});
});


module.exports = router;