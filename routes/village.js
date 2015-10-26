var express = require('express');
var router = express.Router();

router.get('/charts', function(req, res) {
    res.render('village/charts');
});

router.get('/', function(req, res) {
    res.render('village/index');
});

module.exports = router;
