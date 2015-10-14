var express = require('express');
var router = express.Router();

router.get('/charts', function(req, res) {
   res.render('village/charts');
});

module.exports = router;
