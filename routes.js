var Router = require('express').Router;

var prepare_section_params = require('./lib/prepare_section_params');
var geojson_flip_lonlat = require('./lib/geojson_flip_lonlat.js');
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
                //console.log(body);
                res.set('Content-Type', 'text/xml');
                res.send(body);
            } else {
                //console.log(body);
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
        // console.log(JSON.stringify(params));
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
        // console.log(params.bbox);
        // console.log(JSON.stringify(params));
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
        /*var feature = {
    "type":"Feature",
    "geometry":
        {"type":
    "Polygon",
    "coordinates":[[[4.79628704723532,45.2245686201141],[4.79627198205696,45.2244810075761],[4.79623301978841,45.2243971554783],[4.7961716578197,45.2243202861855],[4.7960902543159,45.2242533537068],[4.79599193758517,45.2241989301793],[4.795880485857,45.2241591070292],[4.79576018209113,45.2241354146047],[4.79563564939616,45.2241287633715],[4.79551167338089,45.2241394089266],[4.79539301826325,45.224166942177],[4.79528424380096,45.2242103050595],[4.79518953007658,45.2242678311979],[4.79511251686827,45.2243373099351],[4.79505616377777,45.224416071282],[4.79502263649038,45.224501088517],[4.79501322353864,45.2245890944965],[4.79502828676983,45.2246767072062],[4.79506724742323,45.2247605597291],[4.7951286083547,45.2248374296355],[4.79521001155707,45.2249043628231],[4.79530832876809,45.2249587870468],[4.79541978168514,45.2249986107744],[4.79554008716747,45.2250223035697],[4.79566462184518,45.2250289549107],[4.79578859980762,45.2250183091839],[4.79590725654041,45.2249907755084],[4.79601603203994,45.2249474120122],[4.79611074606575,45.2248898851649],[4.79618775879377,45.2248204057315],[4.7962441106954,45.2247416438072],[4.79627763626632,45.2246566262013],[4.79628704723532,45.2245686201141]]]}
};*/
        var feature = JSON.parse(req.query.geom);

        geojson_flip_lonlat(feature); //FIXME
        // console.log(feature);
        /*var params = {
            geom: feature.geometry
        };*/
        cadastreClient.getCadastreFromGeom(feature, function (featureCollection) {
            res.json(featureCollection);
        });

    });

/*app.get('/cadastre/geometrie', function(req,res){
        var feature = {
    "type":"Feature",
    "geometry":
        {"type":
    "Polygon",
    "coordinates":[[[4.79628704723532,45.2245686201141],[4.79627198205696,45.2244810075761],[4.79623301978841,45.2243971554783],[4.7961716578197,45.2243202861855],[4.7960902543159,45.2242533537068],[4.79599193758517,45.2241989301793],[4.795880485857,45.2241591070292],[4.79576018209113,45.2241354146047],[4.79563564939616,45.2241287633715],[4.79551167338089,45.2241394089266],[4.79539301826325,45.224166942177],[4.79528424380096,45.2242103050595],[4.79518953007658,45.2242678311979],[4.79511251686827,45.2243373099351],[4.79505616377777,45.224416071282],[4.79502263649038,45.224501088517],[4.79501322353864,45.2245890944965],[4.79502828676983,45.2246767072062],[4.79506724742323,45.2247605597291],[4.7951286083547,45.2248374296355],[4.79521001155707,45.2249043628231],[4.79530832876809,45.2249587870468],[4.79541978168514,45.2249986107744],[4.79554008716747,45.2250223035697],[4.79566462184518,45.2250289549107],[4.79578859980762,45.2250183091839],[4.79590725654041,45.2249907755084],[4.79601603203994,45.2249474120122],[4.79611074606575,45.2248898851649],[4.79618775879377,45.2248204057315],[4.7962441106954,45.2247416438072],[4.79627763626632,45.2246566262013],[4.79628704723532,45.2245686201141]]]}
};
        //var feature = req.query.geom;
        console.log(feature);
        geojson_flip_lonlat(feature); //FIXME
        console.log("Resultat après flip lon lat");
        console.log(feature);

        var params = {
            geom: feature.geometry
        };
        cadastreClient.getCadastreFromGeom(params,function(featureCollection){
            res.json(featureCollection);
        }) ;
    });*/

    return router;
};
