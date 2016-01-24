var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://dbuser:hisummer123@ds059654.mongolab.com:59654/mavenli-db';

mongoose.connect(mongodbUri, options);


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once('open', function callback ()
{
  console.log("Mongodb connected @ " + new Date());
});

// Defining DB Schemas
var ProvidersSchema =
{
  providerID          : String,
  name                : String,
  address             : String,
  phoneNumber         : Number,
  email               : String,
  bio                 : String,
  password            : String,
  currentlyWorking    : Boolean,
  rating              : Number,
  reviewsList         : [],
  pastActivitiesList  : [],
};

var UserSchema =
{
  userID              : String,
  name                : String,
  address             : String,
  phoneNumber         : Number,
  email               : String,
  bio                 : String,
  reservationList     : [],
  reviewsList         : [],
  pricePrefence       : Number,
  adventurePrefence   : Number,
  pastActivities      : [],
};

var ActivitiesSchema =
{
  providerID          : String,
  activityID          : String,
  location            : String,
  descriptionTagsList : [],
  title               : String,
  description         : String,
  duration            : Date,
  destinationList     : [],
  transportIncluded   : Boolean,
  foodIncluded        : Boolean,
  lodgingIncluded     : Boolean,
  ticketsIncluded     : Boolean,
  equipmentIncluded   : Boolean,
  price               : Number,
  pricePointScore     : Number,
  adventurePointScore : Number,
};

var DestinationSchema =
{
  destinationID : String,
  name          : String,
  address       : String
};

var ReservationSchema =
{
  providerID    : String,
  userID        : String,
  activityID    : String,
  startTime     : Date,
  bookedPrice   : Number,
  completed     : Boolean,
};

var ReviewSchema =
{
  reviewID      : String,
  providerID    : String,
  userID        : String,
  comment       : String,
  rating        : Number
};

//Initialize our appontment database using the above schema
var ProvidersDB = mongoose.model('ProvidersDB', mongoose.Schema(ProvidersSchema));

var UserDB = mongoose.model('UserDB', mongoose.Schema(UserSchema));

var ActivitiesDB = mongoose.model('ActvitiesDB', mongoose.Schema(ActivitiesSchema));

var DestinationDB = mongoose.model('DestinationDB', mongoose.Schema(DestinationSchema));

var ReservationDB = mongoose.model('ReservationDB', mongoose.Schema(ReservationSchema));

var ReviewDB = mongoose.model('ReviewDB', mongoose.Schema(ReviewSchema));

// Activities
exports.getAllActivitiesByLocation = function(req, res)
{
  console.log("getAllActivies");
  console.log(req.params.location);
  ActivitiesDB.find({ location: req.params.location }, function(err, obj)
  {
    res.json(obj);
  });
};
