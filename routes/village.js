var express = require('express');
var router = express.Router();

router.get('/line-chart', function(req, res) {
    res.render('line-chart');
});

router.get('/charts', function(req, res) {
   res.render('charts');
});

module.exports = router;
