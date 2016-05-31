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
  reviewList          : [],
  pricePrefence       : Number,
  adventurePrefence   : Number,
  pastActivitiesList  : [],
};

var ActivitiesSchema =
{
  activityID          : String,
  providerID          : String,
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
  adventurePointScore : Number
};

var ReservationSchema =
{
  reservationID : String,
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

var ReservationsDB = mongoose.model('ReservationsDB', mongoose.Schema(ReservationSchema));

var ReviewsDB = mongoose.model('ReviewsDB', mongoose.Schema(ReviewSchema));

// Activities
exports.createActivity = function(req, res)
{
  var activity = new ActivitiesDB(req.body);
  activity.save();
  res.json(req.body);
};

exports.deleteActivity = function(req, res)
{
  ActivitiesDB.remove({activityID: req.params.activityID}, function(err)
  {
      var result = (!err) ? true : false;
      res.json(result);
  });
};

exports.updateActivity = function(req, res)
{
    ActivitiesDB.findByIdAndUpdate(req.params.activityID,
    {
        $set:
        {
          activityID          : req.body.activityID,
          providerID          : req.body.providerID,
          location            : req.body.location,
          descriptionTagsList : req.body.descriptionTagsList.slice(),
          title               : req.body.title,
          description         : req.body.description,
          duration            : req.body.duration,
          destinationList     : req.body.destinationList.slice(),
          transportIncluded   : req.body.transportIncluded,
          foodIncluded        : req.body.foodIncluded,
          lodgingIncluded     : req.body.lodgingIncluded,
          ticketsIncluded     : req.body.ticketsIncluded,
          equipmentIncluded   : req.body.equipmentIncluded,
          price               : req.body.price,
          pricePointScore     : req.body.pricePointScore,
          adventurePointScore : req.body.adventurePointScore,
          destinationList     : req.body.destinationList.slice()
        }
    },
    {
        upsert: true
    },

    function(err, obj)
    {
        return res.json(true);
    });
};

exports.getAllActivitiesByLocation = function(req, res)
{
  ActivitiesDB.find({ location: req.params.location }, function(err, obj)
  {
    res.json(obj);
  });
};

exports.getAllActivitiesTst = function(req, res)
{
  ActivitiesDB.find({}, function(err, obj)
  {
    res.json(obj);
  });
};

// Providers
exports.createProvider = function(req, res)
{
  var provider = new ProvidersDB(req.body);
  provider.save();
  res.json(req.body);
};

exports.updateProvider = function(req, res)
{
    ProvidersDB.findByIdAndUpdate(req.params.providerID,
    {
        $set:
        {
          providerID          : req.body.providerID,
          name                : req.body.name,
          address             : req.body.address,
          phoneNumber         : req.body.phoneNumber,
          email               : req.body.email,
          bio                 : req.body.bio,
          password            : req.body.password,
          currentlyWorking    : req.body.currentlyWorking,
          rating              : req.body.rating,
          reviewsList         : req.body.reviewsList.slice(),
          pastActivitiesList  : req.body.pastActivitiesList.slice(),
        }
    },
    {
        upsert: true
    },

    function(err, obj)
    {
        return res.json(true);
    });
};

exports.deleteProvider = function(req, res)
{
  ProvidersDB.remove({providerID: req.params.providerID}, function(err)
  {
      res.json(true);
  });
};

exports.getProvider = function(req, res)
{
  ProvidersDB.find({ providerID: req.params.providerID }, function(err, obj)
  {
    res.json(obj);
  });
};

exports.getAllProviderTst = function(req, res)
{
  ProvidersDB.find({}, function(err, obj)
  {
    res.json(obj);
  });
};

// Reservations
exports.createReservation = function(req, res)
{
  var reservation = new ReservationsDB(req.body);
  reservation.save();
  res.json(req.body);
};

exports.updateReservation = function(req, res)
{
    ReservationsDB.findByIdAndUpdate(req.params.reservationId,
    {
        $set:
        {
            reservationID : req.body.reservationId,
            providerID    : req.body.providerID,
            userID        : req.body.userID,
            activityID    : req.body.activityID,
            startTime     : req.body.startTime,
            bookedPrice   : req.body.bookedPrice,
            completed     : req.body.completed
        }
    },
    {
        upsert: true
    },

    function(err, obj)
    {
        return res.json(true);
    });
};

exports.deleteReservation = function(req, res)
{
  ReservationsDB.remove({reservationID: req.params.reservationID}, function(err)
  {
      res.json(true);
  });
};

exports.getReservation = function(req, res)
{
  ReservationsDB.find({ reservationID: req.params.reservationID }, function(err, obj)
  {
    res.json(obj);
  });
};
