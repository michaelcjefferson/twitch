var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// Express Configuration
// -----------------------------------------------------
// Logging and Parsing
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

function makeLiveStreamersUrl(streamers) {
  return 'https://api.twitch.tv/kraken/streams?client_id=se018r7lxrfo1mty4x09djktl2ajfsy&channel=' + streamers.join(',');
}

function makeOfflineStreamerUrl(streamer) {
  return 'https://api.twitch.tv/kraken/channels/' + streamer + '?client_id=se018r7lxrfo1mty4x09djktl2ajfsy';
}

app.post('/getStreamerList', function(req, res, next){
  var url = makeLiveStreamersUrl(req.body);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.json(data);
    }
  });
});

app.post('/getOfflineStreamers', function(req, res, next){
  var url = makeOfflineStreamerUrl(req.body.streamer);
  request(url, function (error, response, body) {
    // BUG: Seems that sometimes there is a timedout error. Write error catcher so that when this is the case, the error is caught and logged to the server but the server continues instead of crashing. The first error I saw said this: 'Error: connect ETIMEDOUT 52.41.184.100:443 ... code: 'ETIMEDOUT'' so it seems that I need to check to see if the error exists (i.e. is not null) and if there is an error, check to see if its code is 'ETIMEDOUT'. If so, just pass it by
    console.log(url);
    if (error) {
      console.log(error);
      if (error.code === 'ETIMEDOUT') {
        res.json({
          'message': 'The server took too long to respond with information about this user. Please try again.'
        });
      } else {
        res.json({
          'message': error
        });
      }
    } else {
      var data = JSON.parse(body);
      res.json(data);
    }
  });
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
