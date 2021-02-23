var child_process = require('child_process');
child_process.execSync('npm install');

var express = require('express');
var app = express();

//Redirecionamento HTTPS
app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});
//----------------

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


var highlightsRoutes = require('./api/routes/highlightsRoutes'); 
var authRoutes = require('./api/routes/authRoutes'); 
highlightsRoutes(app); //register the route
authRoutes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);