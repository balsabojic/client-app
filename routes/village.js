var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/charts', function(req, res) {
    res.render('village/charts', {address : client.getNodeServerAddress(), simName : client.getSimName()});
});

router.get('/', function(req, res) {
    res.render('village/index', {address : client.getNodeServerAddress()});
});

module.exports = router;
