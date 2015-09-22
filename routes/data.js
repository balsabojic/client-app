var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/', function(req, res) {
    var data = client.getData();
    res.json(data);
});

module.exports = router;
