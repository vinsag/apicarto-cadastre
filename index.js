var Hapi = require('hapi');
var Zone = require('./handlers/zone');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});
var plugin = {
    register: require('hapi-node-postgres'),
    options: {
        connectionString: 'postgres://nabil:lala@localhost/cadastre',
        native: true
    },
};

server.register(plugin, function (err) {

    if (err) {
        console.error('Failed loading "hapi-node-postgres" plugin');
    }
});
server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      args:[{ response: '*' }]
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }
});

// Add the route
server.route({
    method: ['POST'],
    path:'/cadastre',
    handler: Zone.zonage
});

// Start the server
server.start();