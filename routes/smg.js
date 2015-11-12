var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/', function(req, res) {
    res.render('smg/charts', {address : client.getNodeServerAddress()});
});

module.exports = router;