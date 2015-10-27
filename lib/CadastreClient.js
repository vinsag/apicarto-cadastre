var request = require('request');

var geojson_flip_lonlat = require('../lib/geojson_flip_lonlat.js') ;
var geom_featureCollection = require('../lib/geom_featurecollection.js') ;
var cql_filter = require('./cql_filter');

/**
 * Constructeur avec :
 * apiKey : une clé IGN avec les droits sur BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:divcad et BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:parcelle
 * referer : le referer correspondant à la clée
 */
var CadastreClient = function (apiKey,referer) {
    this.apiKey = apiKey;
    this.referer = referer || 'http://localhost';
    this.proxy = null;
};

CadastreClient.prototype.getProxy = function () {
    return this.proxy ;
};

CadastreClient.prototype.setProxy = function (proxy) {
    this.proxy = proxy ;
};


/**
 * URL vers le service WFS
 */
CadastreClient.prototype.getBaseUrl = function () {
    return 'http://wxs.ign.fr/'+this.apiKey+'/geoportail/wfs';
};

CadastreClient.prototype.getDefaultOptions = function(){
    return {
        uri: this.getBaseUrl(),
        headers: {
            'Referer': this.referer
        },
        proxy: this.proxy
    };
};


CadastreClient.prototype.getCapabilities = function(callback){
    var options = this.getDefaultOptions();
    options.uri += '?request=GetCapabilities' ;
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            callback(null);
        }
    });
};



/**
 * Récupération des communes pour un code département et un code commune
 */
CadastreClient.prototype.getDivisions = function(params, callback){
    var options = this.getDefaultOptions();
    options.uri += '?request=GetFeature&version=2.0.0' ;
    options.uri += '&typename=BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:divcad' ;
    options.uri += '&outputFormat='+encodeURIComponent('application/json') ;
    options.uri += '&cql_filter='+encodeURIComponent(cql_filter(params));

    // console.log( options.uri ) ;

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                callback(JSON.parse(body));
            } catch(err){
                // console.log(body);
                callback(null);
            }
        }else{
            callback(null);
        }
    });
};


/**
 * Récupération des parcelles
 */
CadastreClient.prototype.getParcelles = function(params, callback){
    var options = this.getDefaultOptions();
    options.uri += '?request=GetFeature&version=2.0.0' ;
    options.uri += '&typename=BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:parcelle' ;
    options.uri += '&outputFormat='+encodeURIComponent('application/json') ;
    options.uri += '&cql_filter='+encodeURIComponent(cql_filter(params));

    // console.log( options.uri ) ;

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var geojson = geojson_flip_lonlat(JSON.parse(body));
                callback(geojson);
            } catch(err) {
                // console.log(err);
                callback(null);
            }
        }else{
            callback(null);
        }
    });
};


/* Recuperer les informations du cadastre à partir d'une geometrie
 * le résultat retourne :
 * Informations sur la parcelle
 * Calcul des surfaces et des intersections
 */
 
CadastreClient.prototype.getCadastreFromGeom = function (params, callback) {
    var options = this.getDefaultOptions();
    var paramsGeom = {
        geom: params.geometry
    };
    options.uri += '?request=GetFeature&version=2.0.0' ;
    options.uri += '&typename=BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:parcelle' ;
    options.uri += '&outputFormat='+encodeURIComponent('application/json') ;

    options.uri += '&cql_filter='+encodeURIComponent(cql_filter(paramsGeom));
    // console.log(options.uri);
    var geoInitialParams = params;
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var geojson = geojson_flip_lonlat(JSON.parse(body));
                var resultatGeom = geom_featureCollection(geojson, geoInitialParams);
                callback(resultatGeom);
            } catch(err) {
                // console.log(err);
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};


module.exports = CadastreClient ;
