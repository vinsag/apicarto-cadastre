

function geojson_flip_lonlat_coordinate(coordinate){
	if ( coordinate.length >= 2 ){
		//console.log("Je suis dans les coordonnées");
		var temp = coordinate[0];
		coordinate[0] = coordinate[1] ;
		coordinate[1] = temp ;
	}	
	return coordinate;
}

function geojson_flip_lonlat_coordinate_array_2(coordinates){
	for ( var i in coordinates ){
		//console.log("je suis dans boucle cordinates");console.log(i);
		geojson_flip_lonlat_coordinate(coordinates[i]);
	}
}

function geojson_flip_lonlat_coordinate_array_3(coordinates){
	for ( var i in coordinates ){
		//console.log("je suis dans boucle cordinates");console.log(i);
		geojson_flip_lonlat_coordinate_array_2(coordinates[i]);
	}
}


function geojson_flip_lonlat_coordinate_array_4(coordinates){
	//console.log("je suis dans boucle cordinates4");
	for ( var i in coordinates ){
		geojson_flip_lonlat_coordinate_array_3(coordinates[i]);
	}
}


function geojson_flip_lonlat_geometry(geometry){
	if ( geometry["type"] == "Point" ){
		geojson_flip_lonlat_coordinate(geometry["coordinates"]);
	}else if ( geometry["type"] == "LineString" ){
		geojson_flip_lonlat_coordinate_array_2(geometry["coordinates"]);
		//console.log("Je suis dans orientation Ligne");
	} else if ( geometry["type"] == "Polygon" ){
		geojson_flip_lonlat_coordinate_array_3(geometry["coordinates"]);
		//console.log("Je suis dans orientation Polygone");
	} else if ( geometry["type"] == "MultiPolygon" ){
		//console.log("je suis dans Multipolygon");
		geojson_flip_lonlat_coordinate_array_4(geometry["coordinates"]);
	}else{
		throw "type géométrique non supporté : " + geometry["type"] ;
	}
	
}

function geojson_flip_lonlat_feature(feature){
	geojson_flip_lonlat_geometry(feature["geometry"]);
}


function geojson_flip_lonlat_features(features){
	for ( var i in features ){
		geojson_flip_lonlat_feature(features[i]);
	}
}

var geojson_flip_lonlat = function(geojson){
	if ( geojson["type"] == "FeatureCollection" ){
		geojson_flip_lonlat_features(geojson["features"]);
	
	}else if ( geojson["type"] == "Feature" ){
		//console.log("je suis dans la feature");
		geojson_flip_lonlat_feature(geojson);
	
	}else{
		//console.log("Je suis dans la geometry")
		geojson_flip_lonlat_geometry(geojson);
	}
	return geojson;
}


module.exports = geojson_flip_lonlat ;


