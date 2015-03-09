var Hapi = require('hapi');
var format = require ('pg-format')
var turf = require('turf')

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
    }
};

server.register(plugin, function (err) {

    if (err) {
        console.error('Failed loading "hapi-node-postgres" plugin');
    }
 });

function cadastre(poly){
    sql = format("select ROUND(ST_AREA(ST_INTERSECTION(g.poly, geom))/ST_AREA(geom)*100, 2) as part, \
                    ST_ASGeoJSON(ST_TRANSFORM(geom, 4326)) as shape, \
                    numero, feuille, section, code_dep, nom_com, code_com, code_arr \
                  FROM parcelles, (SELECT ST_TRANSFORM(ST_setSRID(ST_GeomFromGeoJSON('%s'), 4326), 2154) as poly) g \
                  WHERE ST_INTERSECTS( g.poly, geom);", poly)
    console.log(sql);
    return sql
}

function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
       reply('hello world');
    },
    method: ['POST'],
    path:'/cadastre',
    handler: function (request, reply) {
      console.log(request.payload);
      geom = JSON.parse(request.payload.geom);
      var area = turf.area(geom.geometry);
      if (area>38363030){
        reply({status:'Area too big'})
          .code(403)
          .header('access-control-allow-origin', '*')
      }
      console.log(area);
      sql = cadastre(geom.geometry);
      request.pg.client.query(sql, function (err, result){
        var featureCollection = new FeatureCollection();
        console.log(result.rows.length);
        for (i = 0; i < result.rows.length; i++){
          featureCollection.features[i] = {type: "Feature",
                                            geometry:JSON.parse(result.rows[i].shape),
                                            properties:{part:result.rows[i].part,
                                                        numero:result.rows[i].numero,
                                                        feuille:result.rows[i].feuille, 
                                                        section:result.rows[i].section,
                                                        code_dep:result.rows[i].code_dep,
                                                        nom_com:result.rows[i].nom_com,
                                                        code_com:result.rows[i].code_com,
                                                        code_arr:result.rows[i].code_arr
                                            }
                                          };
        }
        reply(featureCollection)
           .header('access-control-allow-origin', '*')
      })  
    }
});

// Start the server
server.start();