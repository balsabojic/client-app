
var net = require('net');

var sendData = [];
var connected = false;

var vppData = null;
var villageData = null;
var simulationData = {};

var client = net.connect(4321,/*'127.0.0.1'*/'192.168.21.233',
    function() { //'connect' listener
        connected = true;
        console.log('connected to server!');
    });

client.on('data', function(data) {
    var obj = JSON.parse(data);
    sendData.push(obj);

    // Vpp and Village data
    vppData = obj.vpp;
    villageData = obj.village;

    // Simulation data
    simulationData['name'] = obj.simulationName;
    simulationData['start'] = obj.startDate;
    simulationData['end'] = obj.endDate;
    simulationData['interval'] = obj.timeInterval;
    simulationData['progress'] = obj.progress;

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
    client.connect(4321,/*'127.0.0.1'*/'192.168.21.233',
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

exports.getVillageData = function() {
    return villageData;
}

exports.getSimulationData = function() {
    return simulationData;
}