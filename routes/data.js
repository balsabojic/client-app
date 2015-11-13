var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

router.get('/', function(req, res) {
    var data = client.getData();
    res.json(data);
});

router.get('/vpp', function(req, res) {
    // Add vpp data
    var data = client.getVppData();
    res.json(data);
});

router.get('/village', function(req, res) {
    // Add village data
    var data = client.getVillageData();
    res.json(data);
});

router.get('/simulation', function(req, res) {
    // Add simulation data
    var data = client.getSimulationData();
    res.json(data);
});

router.get('/partial', function(req, res) {
    // Add simulation data
    var data = client.getPartialData();
    res.json(data);
});

module.exports = router;
