/**
 * Created by balsa on 18.09.15.
 */

function setSessionSimulation(value) {
    sessionStorage['sim'] = value;
}

function getSessionSimulation() {
    var sim = sessionStorage['sim'];
    return sim;
}