var express  = require('express'),
    database = require('./services/database');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* REST routes for User CRUD Service */
//Activities
app.get("/api/activities/location/:location", database.getAllActivitiesByLocation);

//Provdiers
app.post("/api/partners", database.createProvider);
app.delete("/api/partners/:providerID", database.deleteProvider);
app.get("/api/partners/:providerID", database.getProvider);

//Reservations
app.post("/api/reservations", database.createReservation);
app.delete("/api/reservations/:reservationID", database.deleteReservation);
app.get("/api/reservations/:reservationID", database.getReservation);

//Test
app.get("/api/test/activities", database.getAllActivitiesTst);
app.get("/app/test/partners", database.getAllProviderTst);

/* Default Routing */
app.get("/", function(request, response) {
  response.render('pages/index');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
