var growl = require('./growl');
var http = require('http');

var routes = new Array();

if(process.argv.length < 3) {
  console.log("Usage : node bus-growler.js ROUTE ROUTE ROUTE");
  console.log("Where ROUTE refers to a specific bus route (e.g 130) ");
  process.exit(1);
}

for(var i=2; i<process.argv.length; i++) {
  routes[process.argv[i].toLowerCase()] = "";
}

setInterval(function() {
  for(var route in routes) {

    console.log("checking route " + route);

    var bus_server = http.createClient(80, 'rossduggan.ie');
    var request = bus_server.request('GET', '/stuff/bus?route=' + route,{'host': 'rossduggan.ie'});

    request.end();
    request.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        var json_response = JSON.parse(chunk);
        var resp_route = json_response.match.exact;
        var resp_status = json_response.status;


        if (routes[resp_route] != null) {

          if (resp_status !== routes[resp_route]) {
            routes[resp_route] = resp_status;
            console.log("Route == " + resp_route + " *** " + routes[resp_route]);
            growl.notify("Route " + resp_route + "\n" + routes[resp_route]);
          }
        } else {
          console.error("Unknown Route " + chunk);
        }
      });
    });
  }
}, 10000);

