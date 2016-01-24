var express  = require('express'),
    activity = require('./services/database');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/* REST routes for User CRUD Service */
//Activities
app.get("/api/activities/location/:location", activity.getAllActivitiesByLocation);

/*
//User
app.get("/api/user/:id", )

//Partners
app.get("/api/partners/:id", )

//Reviews
app.get("/api/reviews/:id", )

//Reservations
app.get("/api/reservations/:id", )
*/

app.get("/", function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
