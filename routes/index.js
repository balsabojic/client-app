var express = require('express');
var router = express.Router();
var client = require('./../connector/client');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Smart Grid', address : client.getNodeServerAddress()});
});

router.post('/simulation', function(req, res) {
  var name = req.body.sim_name;
  console.log("Request sent: " + name);
  if (!client.isConnected())  {
    console.log('Client is null');
    client.createClient();
  }
  client.sendData(name);
});

router.get('/close', function(req, res) {
  client.closeConnection();
  console.log("connection is closed by Balsa");
});

router.post('/stop', function(req, res) {
  client.stopSimulation();
  console.log("connection is stopped -> state machine");
});

module.exports = router;
