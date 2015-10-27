var prepare_section_params = require('./lib/prepare_section_params');

module.exports = function(app,cadastreClient){

    /**
     * Récupération des divisions pour une commune.
     *
     * Paramètres : code_dep=25 et code_com=349
     *
     */
    app.post('/cadastre', function(req,res){
        res.json({"message":"TODO"});
    });


    /**
     * Récupération des divisions pour une commune.
     *
     * Paramètres : code_dep=25 et code_com=349
     *
     */
    app.get('/search/cadastre', function(req,res){
        res.json({"message":"TODO"});
    });

}
