// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'src')));
// Get our API routes
/*const api = require('./server/routes/api');
app.use('/api', api);*/
var User =require('./server/models/user.model.js')
// Set our api routes
var setRoutes =require('./server/routes/routes')
app.use('/api', setRoutes);
// Catch all other routes and return the index file
app.get('/api/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});
// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
/**
 *   ADD PACKAGE EJS VA MOONGES
 *   npm install mongoose ejs --save
 *   npm install cors
 */
