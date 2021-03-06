var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));

/* Routes */
app.use('/cadastre', require('./routes')({
    key: process.env.GEOPORTAIL_KEY,
    referer: process.env.GEOPORTAIL_REFERER || 'http://localhost'
}));

/* Ready! */
app.listen(port, function () {
    console.log('Start listening on port %d', port);
});
