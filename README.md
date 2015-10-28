# APICarto Cadastre [![Build Status](https://travis-ci.org/sgmap/apicarto-cadastre.svg)](https://travis-ci.org/sgmap/apicarto-cadastre)

## Installation des dépendances NodeJS

```
npm install
```

## Exécution du service

```
GEOPORTAIL_KEY=VOTRE_CLE_GEOPORTAIL GEOPORTAIL_REFERER=REFERER_DE_LA_CLE npm start
```
Exemple :

```
GEOPORTAIL_KEY=5ad45a4d54a5d4a5d4ad GEOPORTAIL_REFERER=http://mborne.github.io npm start
```

Autres options :

* Définir le port HTTP avec `PORT` (8080 par défaut)


## Développement derrière un proxy

En cas de nécessité, utiliser les [variables d'environnement standards](https://www.npmjs.com/package/request#controlling-proxy-behaviour-using-environment-variables).

## API

### Récupérer les sections pour une communes

```
GET /division?code_dep=25&code_com=349
```

Résultat : FeatureCollection GeoJSON

### Récupérer les parcelles pour une section

```
GET /parcelle?code_dep=25&code_com=349&
```

Résultat : FeatureCollection GeoJSON

#### Récuper les informations parcelles et calcul de surface via une geometrie
GET /geometrie?geom=FeatureCollection.
Exemple : 
{
    "type":"Feature",
    "geometry":
		{"type":
    "Polygon",
    "coordinates":[[[4.79628704723532,45.2245686201141],[4.79627198205696,45.2244810075761],[4.79623301978841,45.2243971554783],[4.7961716578197,45.2243202861855],
    [4.7960902543159,45.2242533537068],[4.79599193758517,45.2241989301793],[4.795880485857,45.2241591070292],[4.79576018209113,45.2241354146047],
    [4.79563564939616,45.2241287633715],[4.79551167338089,45.2241394089266],[4.79539301826325,45.224166942177],[4.79528424380096,45.2242103050595],
    [4.79518953007658,45.2242678311979],[4.79511251686827,45.2243373099351],[4.79505616377777,45.224416071282],[4.79502263649038,45.224501088517],
    [4.79501322353864,45.2245890944965],[4.79502828676983,45.2246767072062],[4.79506724742323,45.2247605597291],[4.7951286083547,45.2248374296355],
    [4.79521001155707,45.2249043628231],[4.79530832876809,45.2249587870468],[4.79541978168514,45.2249986107744],[4.79554008716747,45.2250223035697],
    [4.79566462184518,45.2250289549107],[4.79578859980762,45.2250183091839],[4.79590725654041,45.2249907755084],[4.79601603203994,45.2249474120122],[
    4.79611074606575,45.2248898851649],[4.79618775879377,45.2248204057315],[4.7962441106954,45.2247416438072],[4.79627763626632,45.2246566262013],
    [4.79628704723532,45.2245686201141]]]}
 }


## Obtenir une clé géoportail

TODO : détailler le processus pour les clés WFS

## Notes techniques

Ce service se repose sur l'appel à des services WFS de l'API géoportail

### Service WFS


* Récupérer les divisions cadastrales (couple=> autocomplétion sur section et commune absorbée)

http://wxs.ign.fr/[API_KEY]/geoportail/wfs?
request=GetFeature&version=2.0.0
&typename=BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:divcad
&outputFormat=application/json
&cql_filter=code_dep=25%20and%20code_com=349

* Recherche d'une parcelle précise

http://wxs.ign.fr/[API_KEY]/geoportail/wfs?request=GetFeature&version=2.0.0&typename=BDPARCELLAIRE-VECTEUR_WLD_BDD_WGS84G:parcelle&CountDefault=100&outputFormat=application/json&cql_filter=code_dep=25%20and%20code_com=349
