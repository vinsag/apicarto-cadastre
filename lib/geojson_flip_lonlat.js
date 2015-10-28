function geojson_flip_lonlat_coordinate(coordinate){
    if ( coordinate.length >= 2 ){
        var temp = coordinate[0];
        coordinate[0] = coordinate[1] ;
        coordinate[1] = temp ;
    }   
    return coordinate;
}

function geojson_flip_lonlat_coordinate_array_2(coordinates){
    for ( var i in coordinates ){
        geojson_flip_lonlat_coordinate(coordinates[i]);
    }
}

function geojson_flip_lonlat_coordinate_array_3(coordinates){
    for ( var i in coordinates ){
        geojson_flip_lonlat_coordinate_array_2(coordinates[i]);
    }
}


function geojson_flip_lonlat_coordinate_array_4(coordinates){
    for ( var i in coordinates ){
        geojson_flip_lonlat_coordinate_array_3(coordinates[i]);
    }
}


function geojson_flip_lonlat_geometry(geometry){
    if ( geometry['type'] == 'Point' ){
        geojson_flip_lonlat_coordinate(geometry['coordinates']);
    }else if ( geometry['type'] == 'LineString' ){
        geojson_flip_lonlat_coordinate_array_2(geometry['coordinates']);
    } else if ( geometry['type'] == 'Polygon' ){
        geojson_flip_lonlat_coordinate_array_3(geometry['coordinates']);
    } else if ( geometry['type'] == 'MultiPolygon' ){
        geojson_flip_lonlat_coordinate_array_4(geometry['coordinates']);
    }else{
        throw 'type géométrique non supporté : ' + geometry['type'] ;
    }
}

function geojson_flip_lonlat_feature(feature){
    geojson_flip_lonlat_geometry(feature['geometry']);
}


function geojson_flip_lonlat_features(features){
    for ( var i in features ){
        geojson_flip_lonlat_feature(features[i]);
    }
}

var geojson_flip_lonlat = function(geojson){
    if ( geojson['type'] == 'FeatureCollection' ){
        geojson_flip_lonlat_features(geojson['features']);
    }else if ( geojson['type'] == 'Feature' ){
        geojson_flip_lonlat_feature(geojson);
    }else{
        geojson_flip_lonlat_geometry(geojson);
    }
    return geojson;
};


module.exports = geojson_flip_lonlat ;
