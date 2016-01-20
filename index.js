var express  = require('express'),
    activity = require('./services/activity');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/* REST routes for User CRUD Service */
app.get("/api/activities", activity.getAllActivities);

/*
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/partner', function(request, response ) {
  response.render('pages/partner');
});
app.get('/howitworks', function(request, response) {
  response.render('pages/howitworks')
});
app.get('/userlogin', function(request, response) {
  response.render('pages/userlogin')
});
*/

app.get("/", function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
