
//Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express Configuration

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('app/public'));

// Router

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listner

app.listen(PORT, function() {
  console.log("App listening on PORT" + PORT);
});
