/*
 * Dependencies
 */
var express = require('express');
var request = require('request');
var nconf = require('nconf');
var CadastreClient = require('./lib/CadastreClient.js') ;
var parse_insee = require('./lib/parse_insee.js') ;
//var geojson_flip_lonlat = require('./lib/geojson_flip_lonlat.js') ;

console.log(parse_insee("25349")) ;
console.log(parse_insee("97185")) ;

/*
 * Configuration
 */
nconf.env().argv().defaults({
    'http': {
        'port': '8080'
    },
    key: null,
    referer: "http://localhost",
    proxy: null
});

if ( null === nconf.get("key") ){
    console.log("Paramètre manquant 'key' (--key=[VOTRE_CLEF_GEOPORTAIL])");
    process.exit(1);
}

console.log( "listening port "+nconf.get("http:port") );
console.log("============================================") ;
console.log( "key = "+nconf.get("key") );
console.log( "referer = "+nconf.get("referer") );
console.log( "proxy = "+nconf.get("proxy")) ;
console.log("============================================") ;

/*
 * Init client
 */
var cadastreClient = new CadastreClient(nconf.get("key"), nconf.get("referer"));
cadastreClient.setProxy(nconf.get("proxy"));

/*
 * Route & serv
 */
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');

app.use(bodyParser.json());


require('./routes.js')(app,cadastreClient);

app.listen(nconf.get('http:port'));
