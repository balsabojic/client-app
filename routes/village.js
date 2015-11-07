var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/charts', function(req, res) {
    res.render('village/charts', {address : client.getNodeServerAddress()});
});

router.get('/', function(req, res) {
    res.render('village/index', {address : client.getNodeServerAddress()});
});

router.get('/smg', function(req, res) {
	res.render('village/smg', {address : client.getNodeServerAddress()});
});

module.exports = router;
