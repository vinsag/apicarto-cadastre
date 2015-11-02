/* En parametre nous avons :
 * GeomInit : Correspondant à la geométrie passé en paramètre
 * Parcelle : Resultat de la recherche avec Géométrie
 *
 */
 var turf = require('turf');

var geojson_intersection = function(parcelle, geomInit){
		console.log(" je suis dans geojsonIntersection");
        var parcellePolygon = {
                "type": 'Feature',
                "properties":{},
                "geometry":{
                    "type":'Polygon',
                    "coordinates" : parcelle.geometry.coordinates[0]
                }
            };
               
		var intersect_polygon = turf.intersect(parcellePolygon, geomInit);
		if (typeof intersect_polygon == 'undefined' ) { 
			var surface_parcelle =0;
			//console.log("Je suis dans reponse negative");
		} else {
			var  surface_parcelle= turf.area(intersect_polygon);
		}
		return surface_parcelle;
};


module.exports = geojson_intersection;
