var test = require('unit.js');
var valeurGeometry = { "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [102.0, 0.5]},"properties": {"prop0": "value0"} }]};
var geojson_flip_lonlat = require('../lib/geojson_flip_lonlat.js') ;

describe('test flip lon/lat', function() {
    
    /* Premier test Le point Classique*/
    it('should work for point Classique', function(){
        var input = {"type":"Point","coordinates":[2,3]};
        var expected = {"type":"Point","coordinates":[3,2]};
        
        var result = geojson_flip_lonlat(input);
        test.value(JSON.stringify(result)).isEqualTo(JSON.stringify(expected));
    });
    
    /* Test du Multipolygon */
    
    it('should work for feature Multipolygon', function(){
        var input = {"type":"Feature","geometry":{ "type": "MultiPolygon",
    "coordinates": [
      [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
      [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
       [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
      ]
    }};
        var expected = {"type":"Feature","geometry":{"type": "MultiPolygon",
    "coordinates": [
      [[[2.0, 102.0], [2.0, 103.0], [3.0, 103.0], [3.0, 102.0], [2.0, 102.0]]],
      [[[0.0, 100.0], [0.0, 101.0], [1.0, 101.0], [1.0, 100.0], [0.0, 100.0]],
       [[0.2, 100.2], [0.2, 100.8], [0.8, 100.8], [0.8, 100.2], [0.2, 100.2]]]
      ]
    }};
        
        var result = geojson_flip_lonlat(input);
        test.value(JSON.stringify(result)).isEqualTo(JSON.stringify(expected));
    });
    
    /* Test du polygon */
    it('should work for feature Polygon', function(){
        var input = {"type":"Feature","geometry":{ "type": "Polygon",
    "coordinates": [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
      ]
   }};
        var expected = {"type":"Feature","geometry":{ "type": "Polygon",
    "coordinates": [
      [ [0.0, 100.0], [0.0, 101.0], [1.0, 101.0], [1.0, 100.0], [0.0, 100.0] ]
      ]
   }};
        
        var result = geojson_flip_lonlat(input);
        test.value(JSON.stringify(result)).isEqualTo(JSON.stringify(expected));
    });
    
    /* Test featureCollection Point */
     it('should work for featureCollection Point', function(){
        var input = {"type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [100.0, 0.5]},"properties": {"prop0": "value0"} }]};
        
        var expected =  {"type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [0.5, 100]},"properties": {"prop0": "value0"} }]};
        
        var result = geojson_flip_lonlat(input);
        //console.log(JSON.stringify(result));
        test.value(JSON.stringify(result)).isEqualTo(JSON.stringify(expected));
    });
    
    /* Test featureCoolection Polygon */
     it('should work for featureCollection Polygon', function(){
        var input = {"type": "FeatureCollection","features": [{ "type": "Feature","geometry": { "type": "Polygon",
    "coordinates": [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
      ]
   },"properties": {"prop0": "value0"} }]};
        var expected =  {"type": "FeatureCollection","features": [{ "type": "Feature","geometry": { "type": "Polygon",
    "coordinates": [
     [ [0.0, 100.0], [0.0, 101.0], [1.0, 101.0], [1.0, 100.0], [0.0, 100.0] ]
      ]
   },"properties": {"prop0": "value0"} }]};
        
        var resultbis = geojson_flip_lonlat(input);
        console.log(JSON.stringify(resultbis));
        test.value(JSON.stringify(resultbis)).isEqualTo(JSON.stringify(expected));
    });
    
    /* Test du feature Collection Multipolygon */
    
    it('should work for feature Collection Multipolygon', function(){
        var input = {"type": "FeatureCollection","features": [{ "type": "Feature","geometry":{ "type": "MultiPolygon",
    "coordinates": [
      [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
      [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
       [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
      ]
    }}]};
        var expected = {"type": "FeatureCollection","features": [{ "type": "Feature","geometry":{ "type": "MultiPolygon",
    "coordinates": [
      [[[2.0, 102.0], [2.0, 103.0], [3.0, 103.0], [3.0, 102.0], [2.0, 102.0]]],
      [[[0.0, 100.0], [0.0, 101.0], [1.0, 101.0], [1.0, 100.0], [0.0, 100.0]],
       [[0.2, 100.2], [0.2, 100.8], [0.8, 100.8], [0.8, 100.2], [0.2, 100.2]]]
      ]
    }}]};
        
        var result = geojson_flip_lonlat(input);
        console.log(JSON.stringify(result));
        test.value(JSON.stringify(result)).isEqualTo(JSON.stringify(expected));
    });


   
});
