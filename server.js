var child_process = require('child_process');
child_process.execSync('npm install');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var db = require("./api/models");
var mongoose = db.mongoose;
var HighlightRoutes = require('./api/routes/highlightsRoutes');
var bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://extensaoadmin:Lookit2020@kamino.mongodb.umbler.com:51308/extensaousers?authSource=extensaousers&readPreference=primary&appname=MongoDB%20Compass&ssl=false'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/highlightsRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);