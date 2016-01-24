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
  Name                : String,
  Address             : String,
  PhoneNumber         : Number,
  Email               : String,
  Bio                 : String,
  ReservationList     : [],
  ReviewsList         : [],
  PricePref           : Number,
  AdventurePref       : Number,
  PastActivities      : [],
};

var ActivitiesSchema =
{
  ProviderID          : String,
  ActivityID          : String,
  StartLocation       : String,
  DescriptionTagsList : [],
  Title               : String,
  Description         : String,
  Duration            : Date,
  DestinationList     : [],
  TransportIncluded   : Boolean,
  FoodIncluded        : Boolean,
  LodgingIncluded     : Boolean,
  TicketsIncluded     : Boolean,
  EquipmentIncluded   : Boolean,
  Price               : Number,
  PricePointScore     : Number,
  AdventurePointScore : Number,
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


exports.getAllActivities = function(req, res)
{
  /*  console.log("db create");
  var act = new ActivitiesDB({ name: 'summer'});
  act.save(); */

  console.log("getAllActivies");
  ActivitiesDB.find({}, function(err, obj)
  {
    res.json(obj);
  });
};
