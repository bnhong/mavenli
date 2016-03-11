var express    = require('express'),
    database   = require('./services/database')
    bodyParser = require('body-parser'),
    jwt        = require('express-jwt');

var app = express();
var jsonParser = bodyParser.json();
var jwtCheck = jwt({
  secret: new Buffer('3NCPPX3z4sf_Cn6kBwelUYbDOWibVKIV25uqJ-Kd1ZPZE5FhO_iLrC092fmqMZe-', 'base64'),
  audience: 'W2JYTHEJIrMJf0Qaa7XN5Bvk5enH5Bhe'
});


app.set('port', (process.env.PORT || 5000));

// View engine not needed for HTML
// Use static middleware to serve out HTML
app.use(express.static(__dirname + '/public'));

/* REST routes for User CRUD Service */
//Activities
app.post("/api/activities", jsonParser, database.createActivity);
app.put("/api/activities/:id", jsonParser, database.updateActivity);
app.delete("/api/activities/:activityID", database.deleteActivity);
app.get("/api/activities/location/:location", database.getAllActivitiesByLocation);

//Providers
app.post("/api/partners", jsonParser, database.createProvider);
app.put("/api/partners/:providerID", jsonParser, database.updateProvider);
app.delete("/api/partners/:providerID", database.deleteProvider);
app.get("/api/partners/:providerID", database.getProvider);

//Reservations
app.post("/api/reservations", database.createReservation);
app.put("/api/reservations/:reservationID", jsonParser, database.updateReservation);
app.delete("/api/reservations/:reservationID", database.deleteReservation);
app.get("/api/reservations/:reservationID", database.getReservation);

//Test
app.use("/api/test/activities", jwtCheck);
app.get("/api/test/activities", database.getAllActivitiesTst);
app.get("/api/test/partners", database.getAllProviderTst);

/* Default Routing */
app.get("/", function(request, response) {
  response.sendfile('./public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
