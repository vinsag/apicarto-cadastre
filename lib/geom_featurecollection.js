/* Retourne un resultat FeatureCollection
 * Recois en paramètre une geometrie
 */
 var WKT = require('terraformer-wkt-parser');
 var turf = require('turf');
var util = require("util");
 
function FeatureCollection() {
  this.type = 'FeatureCollection';
  this.features = new Array();
}
 var geom_featureCollection= function(parcelles,paramInit){
	 var featureCollection = new FeatureCollection();
	var paramInitMod=  paramInit;
	//console.log(paramInitMod);
	 for (var i = 0, len = parcelles.features.length; i < len; i++) {
		
		parcelle = parcelles.features[i];
		//console.log(parcelle);
		//surface_intersection = (turf.area(turf.intersect(parcelle, paramInitMod)) / 10000).toFixed(4);
		featureCollection.features[i] = {
			type: "Feature",
			geometry: parcelle.geometry,
			properties: {
			  //surface_intersection: surface_intersection,
			  surface_parcelle: turf.area(parcelle),
			  numero: parcelle.properties.numero,
			  feuille: parcelle.properties.feuille,
			  section: parcelle.properties.section,
			  code_dep: parcelle.properties.code_dep,
			  nom_com: parcelle.properties.nom_com,
			  code_com: parcelle.properties.code_com,
			  code_arr: parcelle.properties.code_arr
			}
		}
	}
	return featureCollection;
}


module.exports = geom_featureCollection ;
