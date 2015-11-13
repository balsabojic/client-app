
var net = require('net');

var sendData = [];
var partialData = [];
var partialDataCounter = 0;
var connected = false;

var vppData = null;
var villageData = null;
var simulationData = {};

var simName = '';

// Localhost - for internal testing
// var simulationServerAddress = 'localhost';
// var nodeServerAddress = 'http://localhost:3000';

var simulationServerAddress = '192.168.21.233';
var nodeServerAddress = 'http://192.168.21.233:3000';

var client = net.connect(4321, simulationServerAddress,
    function() { //'connect' listener
        connected = true;
        console.log('connected to server!');
    });

client.on('data', function(data) {
    var obj = JSON.parse(data);
    sendData.push(obj);

    // Add partial data with max 10 rows
    if (partialDataCounter < 10) {
        partialData[partialDataCounter] = obj;
    }
    else {
        for (var i = 0; i < 9; i++) {
            partialData[i] = partialData[i+1]
        }
        partialData[9] = obj;
    }
    partialDataCounter = partialDataCounter + 1;

    // Vpp and Village data
    vppData = obj.vpp;
    villageData = obj.village;

    // Simulation data
    simulationData['name'] = obj.simulationName;
    simulationData['start'] = obj.startDate;
    simulationData['end'] = obj.endDate;
    simulationData['interval'] = obj.timeInterval;
    simulationData['progress'] = obj.progress;
    simulationData['currentTime'] = obj.currentTime.time;

    console.log(sendData);
    // Cannot write after end
    //client.end();
});

// When disconnected from the server
client.on('end', function() {
    console.log('disconnected from server');
    connected = false;
});

// Handle error when cannot connect to the server
client.on('error', console.log);

exports.createClient = function() {
    client.connect(4321, simulationServerAddress,
        function() { //'connect' listener
            console.log('connected to server!');
        });
}

exports.isConnected = function() {
    return connected;
}

exports.getData = function() {
    return JSON.stringify(sendData);
};

exports.sendData = function (data) {
    client.write(data + '\r\n');
}

exports.closeConnection = function() {
    client.destroy();
}

exports.stopSimulation = function() {
    console.log("request to close");
    sendData = [];
    var stop = 'stop' + '\r\n';
    client.write(stop);
}

exports.getVppData = function() {
    return vppData;
}

exports.getPartialData = function() {
    return JSON.stringify(partialData);
}

exports.getVillageData = function() {
    return villageData;
}

exports.getSimulationData = function() {
    return simulationData;
}

exports.getNodeServerAddress = function() {
    return nodeServerAddress;
}

exports.setSimName = function(name) {
    simName = name;
}

exports.getSimName = function() {
    return simName;
}
