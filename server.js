// Dependencies
// -----------------------------------------------------
var express         = require('express');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var request         = require('request');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Logging and Parsing
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

function makeUrl(streamers) {
  return 'https://api.twitch.tv/kraken/streams?client_id=se018r7lxrfo1mty4x09djktl2ajfsy&channel=' + streamers.join(',');
}

// REQUIRED, because the requests to the server are coming from a different port (in this case localhost:8080) to the one where the server is hosted (in this case localhost:3000)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.post('/getStreamerList', function(req, res, next){
  console.log(req.body);
  var url = makeUrl(req.body);
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // The response from forecast.io is a string, so convert it to an object using JSON.parse
      var data = JSON.parse(body);
      console.log(data);
      res.json(data);
    }
  });
});

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
