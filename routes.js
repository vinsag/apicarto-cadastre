var Router = require('express').Router;

var prepare_section_params = require('./lib/prepare_section_params');
var CadastreClient = require('./lib/CadastreClient.js');

module.exports = function (options) {
    if (!options.key) {
        throw new Error('Key is not defined');
    }

    var router = new Router();
    var cadastreClient = new CadastreClient(options.key, options.referer || 'http://localhost');

    router.get('/capabilities', function(req, res) {
        cadastreClient.getCapabilities(function(body){
            if (body) {
                res.set('Content-Type', 'text/xml');
                res.send(body);
            } else {
                res.send('Le service distant n\'est pas disponible');
            }
        });
    });

    /**
     * Récupération des divisions pour une commune.
     *
     * Paramètres : code_dep=25 et code_com=349
     *
     */
    router.get('/division', function (req,res) {
        var params = prepare_section_params(req.query);
        cadastreClient.getDivisions(params,function(featureCollection){
            res.json(featureCollection);
        });
    });


    /**
     * Récupération des divisions pour une commune.
     *
     * Paramètres : code_dep=25 et code_com=349
     *
     */
    router.get('/parcelle', function (req,res) {
        //TODO prepare_parcelle_params
        var params = prepare_section_params(req.query);
        cadastreClient.getParcelles(params,function(featureCollection){
            res.json(featureCollection);
        });
    });

 /**
     * Récupération des informations cadastre et commune
     *
     * Paramètres : une feature avec pour nom "geom"...
     *
     */

    router.get('/geometrie', function (req,res) {
        var feature = JSON.parse(req.query.geom);        
        cadastreClient.getCadastreFromGeom(feature, function (featureCollection) {
            res.json(featureCollection);
        });

    });

    return router;
};
